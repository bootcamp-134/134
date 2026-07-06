"""Recipe Match Agent — kilerdeki malzemelere göre tarif arar."""

import json

import pandas as pd

from src.config import INGREDIENT_INDEX_PATH, RECIPES_PARQUET_PATH
from src.data_processing import normalize_ingredient

# Modül yüklenince veriyi bir kere belleğe al (her sorguda tekrar okuma)
_recipes_df: pd.DataFrame | None = None
_ingredient_index: dict | None = None


def _load_data():
    global _recipes_df, _ingredient_index
    if _recipes_df is None:
        _recipes_df = pd.read_parquet(RECIPES_PARQUET_PATH)
    if _ingredient_index is None:
        with open(INGREDIENT_INDEX_PATH, "r", encoding="utf-8") as f:
            _ingredient_index = json.load(f)


def find_matching_recipes(pantry_ingredients: list, top_n: int | None = None) -> pd.DataFrame:
    """Kilerdeki malzemelere göre en uygun tarifleri bulur, skora göre sıralar.
    top_n=None verilirse TÜM adayları döndürür (güvenlik filtresi öncesi kesme yapmamak için önemli)."""
    _load_data()

    candidate_ids = set()
    for ing in pantry_ingredients:
        norm = normalize_ingredient(ing)
        candidate_ids.update(_ingredient_index.get(norm, []))

    if not candidate_ids:
        return pd.DataFrame()

    candidates = _recipes_df.iloc[list(candidate_ids)].copy()
    pantry_set = set(normalize_ingredient(i) for i in pantry_ingredients)

    def score(ner_list):
        recipe_set = set(normalize_ingredient(i) for i in ner_list)
        matched = len(pantry_set & recipe_set)
        ratio = matched / len(recipe_set) if recipe_set else 0
        return matched * ratio

    candidates["match_score"] = candidates["ner_list"].apply(score)
    sorted_candidates = candidates.sort_values("match_score", ascending=False)

    result = sorted_candidates[
        ["title", "ner_list", "vejetaryen", "sutsuz", "glutensiz", "match_score"]
    ]
    return result.head(top_n) if top_n else result