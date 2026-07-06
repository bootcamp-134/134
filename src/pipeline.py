"""Uçtan uca orkestrasyon: Türkçe girdi -> güvenli tarif önerileri."""

import pandas as pd

from src.pantry_parser_agent import pantry_parser_agent
from src.recipe_matcher import find_matching_recipes
from src.safety_filter import apply_category_filters, apply_hard_safety_filter


def generate_safe_recommendations(
    pantry_ingredients: list,
    restricted_ingredients: list | None = None,
    category_restrictions: dict | None = None,
    top_n: int = 10,
) -> pd.DataFrame:
    restricted_ingredients = restricted_ingredients or []
    category_restrictions = category_restrictions or {}

    all_candidates = find_matching_recipes(pantry_ingredients, top_n=None)
    safe = apply_hard_safety_filter(all_candidates, restricted_ingredients)
    safe = apply_category_filters(safe, category_restrictions)

    return safe.head(top_n)


def full_pipeline(
    turkish_text: str,
    restricted_ingredients_turkish: list | None = None,
    category_restrictions: dict | None = None,
) -> pd.DataFrame:
    pantry = pantry_parser_agent(turkish_text)
    print("Ayrıştırılan malzemeler:", pantry)

    restricted_english = []
    if restricted_ingredients_turkish:
        restricted_text = ", ".join(restricted_ingredients_turkish)
        restricted_english = pantry_parser_agent(restricted_text)
        print("Çevrilen kısıtlamalar:", restricted_english)

    return generate_safe_recommendations(
        pantry_ingredients=pantry,
        restricted_ingredients=restricted_english,
        category_restrictions=category_restrictions,
    )