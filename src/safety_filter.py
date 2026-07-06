"""Alerji / kısıtlama hard-filter — güvenlik amaçlı, HER ZAMAN ham metin üzerinde tam tarama yapar.
Bu modül asla normalize edilmiş indeksi kullanmaz — kaçırma riski olmasın diye."""

import pandas as pd


def check_restriction_violation(ner_list: list, restricted_ingredients: list) -> bool:
    """Bir tarifte kısıtlı malzemelerden biri var mı, ham metin üzerinde substring araması ile kontrol eder."""
    full_text = " ".join(i.lower() for i in ner_list)
    return any(restricted.lower().strip() in full_text for restricted in restricted_ingredients)


def apply_hard_safety_filter(candidates: pd.DataFrame, restricted_ingredients: list) -> pd.DataFrame:
    """Kesin eleme — skor değil, filtre. Her aday tek tek ham metinle kontrol edilir."""
    if not restricted_ingredients:
        return candidates
    mask = candidates["ner_list"].apply(
        lambda ner: not check_restriction_violation(ner, restricted_ingredients)
    )
    return candidates[mask]


def apply_category_filters(candidates: pd.DataFrame, restrictions: dict) -> pd.DataFrame:
    """Kategori bazlı kısıtlamalar (vejetaryen, sutsuz, glutensiz) uygular.
    restrictions örneği: {"vejetaryen": True, "glutensiz": True}"""
    result = candidates
    if restrictions.get("vejetaryen"):
        result = result[result["vejetaryen"]]
    if restrictions.get("sutsuz"):
        result = result[result["sutsuz"]]
    if restrictions.get("glutensiz"):
        result = result[result["glutensiz"]]
    return result