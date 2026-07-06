"""Hızlı test/demo dosyası — PyCharm'da doğrudan çalıştırabilirsin (sağ üstteki yeşil ok)."""

from src.pipeline import full_pipeline

if __name__ == "__main__":
    result = full_pipeline(
        turkish_text="Evde tavuk, soğan ve bir kutu mantar çorbası var",
        restricted_ingredients=["onion"],
        category_restrictions={"vejetaryen": False},
    )
    print(result[["title", "ner_list", "match_score"]])