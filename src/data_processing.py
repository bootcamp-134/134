"""Ham CSV veri setini temizler, etiketler ve arama indeksini kurar.
Bu modül sadece scripts/build_dataset.py tarafından çağrılır, tek seferlik işlemdir."""

import ast
import json
import re
import time
import zipfile
from collections import defaultdict

import pandas as pd

from src.config import (
    CSV_INNER_PATH,
    DATASET_ZIP_PATH,
    INGREDIENT_INDEX_PATH,
    MIN_UNIQUE_INGREDIENTS,
    RECIPES_PARQUET_PATH,
)

MEAT_KEYWORDS = ["chicken", "beef", "pork", "bacon", "ham", "sausage", "turkey", "lamb", "steak"]
DAIRY_KEYWORDS = ["milk", "cheese", "butter", "cream", "yogurt"]
GLUTEN_KEYWORDS = ["flour", "bread", "pasta", "wheat", "barley"]


def parse_list_column(value):
    """CSV'de string olarak saklanan Python listelerini gerçek listeye çevirir."""
    try:
        return ast.literal_eval(value)
    except (ValueError, SyntaxError, TypeError):
        return []


def clean_chunk(chunk: pd.DataFrame) -> pd.DataFrame:
    """Bir CSV parçasını (chunk) parse eder ve gereksiz sütunları atar."""
    chunk = chunk.copy()
    chunk["ner_list"] = chunk["NER"].apply(parse_list_column)
    chunk["ingredients_list"] = chunk["ingredients"].apply(parse_list_column)
    chunk = chunk[chunk["ner_list"].apply(len) >= 2]
    return chunk[["title", "ner_list", "ingredients_list", "directions", "link"]]


def load_and_clean_dataset(chunk_size: int = 100_000) -> pd.DataFrame:
    """dataset.zip içindeki CSV'yi chunk chunk okuyup temizler."""
    processed_chunks = []
    start = time.time()

    with zipfile.ZipFile(DATASET_ZIP_PATH) as z:
        with z.open(CSV_INNER_PATH) as f:
            reader = pd.read_csv(f, chunksize=chunk_size)
            for i, chunk in enumerate(reader):
                cleaned = clean_chunk(chunk)
                processed_chunks.append(cleaned)
                print(f"Chunk {i + 1} işlendi — {len(cleaned)} geçerli tarif — {time.time() - start:.0f} sn")

    full_df = pd.concat(processed_chunks, ignore_index=True)
    print(f"\nToplam temiz tarif: {len(full_df)} — Süre: {time.time() - start:.0f} sn")
    return full_df


def compute_tags(ner_list: list) -> tuple:
    """Vejetaryen / sütsüz / glutensiz etiketlerini substring araması ile hesaplar."""
    text = " ".join(i.lower() for i in ner_list)
    return (
        not any(kw in text for kw in MEAT_KEYWORDS),
        not any(kw in text for kw in DAIRY_KEYWORDS),
        not any(kw in text for kw in GLUTEN_KEYWORDS),
    )


def add_diet_tags(df: pd.DataFrame) -> pd.DataFrame:
    """Diyet etiketlerini sütunlara ekler."""
    results = df["ner_list"].apply(compute_tags)
    df["vejetaryen"], df["sutsuz"], df["glutensiz"] = zip(*results)
    return df


def remove_duplicate_ingredients_and_filter(df: pd.DataFrame) -> pd.DataFrame:
    """Tekrarlanan malzemeleri temizler ve çok kısa/bozuk tarifleri eler."""
    df = df.copy()
    df["ner_list"] = df["ner_list"].apply(lambda lst: list(dict.fromkeys(lst)))
    df["ner_unique_len"] = df["ner_list"].apply(lambda lst: len(set(x.lower() for x in lst)))

    before = len(df)
    df_clean = df[df["ner_unique_len"] >= MIN_UNIQUE_INGREDIENTS].copy()
    print(f"Önce: {before}, sonra: {len(df_clean)}, elenen: {before - len(df_clean)}")

    return df_clean.reset_index(drop=True)


def normalize_ingredient(name: str) -> str:
    """Malzeme adını normalize eder (küçük harf, noktalama temizliği, basit tekil/çoğul)."""
    name = name.lower().strip()
    name = re.sub(r"[^a-z\s]", "", name)
    if name.endswith("es"):
        name = name[:-2]
    elif name.endswith("s") and not name.endswith("ss"):
        name = name[:-1]
    return name.strip()


def build_ingredient_index(df: pd.DataFrame) -> dict:
    """Normalize edilmiş malzeme -> tarif index listesi (ters indeks) kurar."""
    index = defaultdict(set)
    for idx, ner_list in enumerate(df["ner_list"]):
        for ingredient in ner_list:
            norm = normalize_ingredient(ingredient)
            if norm:
                index[norm].add(idx)
    return {k: list(v) for k, v in index.items()}


def run_full_pipeline():
    """Tüm veri işleme adımlarını sırayla çalıştırır ve sonucu diske kaydeder.
    Bu fonksiyon sadece BİR KERE çalıştırılır (scripts/build_dataset.py üzerinden)."""

    print("1/5 — CSV okunuyor ve temizleniyor...")
    df = load_and_clean_dataset()

    print("\n2/5 — Diyet etiketleri ekleniyor...")
    df = add_diet_tags(df)

    print("\n3/5 — Tekrar temizliği ve minimum malzeme filtresi uygulanıyor...")
    df_clean = remove_duplicate_ingredients_and_filter(df)

    print("\n4/5 — Arama indeksi kuruluyor...")
    index = build_ingredient_index(df_clean)
    print(f"İndekste {len(index)} farklı malzeme var")

    print("\n5/5 — Sonuçlar kaydediliyor...")
    DATA_processed_dir = RECIPES_PARQUET_PATH.parent
    DATA_processed_dir.mkdir(parents=True, exist_ok=True)

    df_clean.to_parquet(RECIPES_PARQUET_PATH)
    with open(INGREDIENT_INDEX_PATH, "w", encoding="utf-8") as f:
        json.dump(index, f)

    print(f"Kaydedildi: {RECIPES_PARQUET_PATH}")
    print(f"Kaydedildi: {INGREDIENT_INDEX_PATH}")