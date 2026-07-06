"""Proje genelinde kullanılan ayarlar ve .env okuma."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Proje kök dizinini bul (bu dosyanın 2 üst klasörü)
BASE_DIR = Path(__file__).resolve().parent.parent

# .env dosyasını yükle
load_dotenv(BASE_DIR / ".env")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY bulunamadı. Proje kök dizininde bir .env dosyası oluşturup "
        "içine GEMINI_API_KEY=senin_keyin şeklinde ekle."
    )

# Veri dosyalarının yolları
DATA_RAW_DIR = BASE_DIR / "data" / "raw"
DATA_PROCESSED_DIR = BASE_DIR / "data" / "processed"

DATASET_ZIP_PATH = DATA_RAW_DIR / "dataset.zip"
CSV_INNER_PATH = "dataset/full_dataset.csv"

RECIPES_PARQUET_PATH = DATA_PROCESSED_DIR / "tarifler_temiz.parquet"
INGREDIENT_INDEX_PATH = DATA_PROCESSED_DIR / "ingredient_index_norm.json"

MIN_UNIQUE_INGREDIENTS = 4