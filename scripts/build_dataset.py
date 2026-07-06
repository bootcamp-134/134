"""Veri setini bir kere işleyip data/processed/ altına kaydeder.
Kullanım: python scripts/build_dataset.py
Bu script'i her çalıştırdığında (chunk okuma dahil) birkaç dakika sürer,
o yüzden sadece veri değiştiğinde veya ilk kurulumda çalıştır."""

import sys
from pathlib import Path

# src/ modülünü import edebilmek için proje kökünü path'e ekle
sys.path.append(str(Path(__file__).resolve().parent.parent))

from src.data_processing import run_full_pipeline

if __name__ == "__main__":
    run_full_pipeline()