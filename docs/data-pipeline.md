# Data Pipeline Notes

## Amaç

Burak'ın veri/ML çalışması, backend'in kullanacağı tarif veritabanını temizlemek ve zenginleştirmek için kullanılacaktır. İlk hedef yemek uydurmak değil, tarifleri güvenilir şekilde etiketlemektir.

## Pipeline

```text
Raw recipe dataset
→ Malzeme temizleme
→ Malzeme normalizasyonu
→ Alerjen etiketleme
→ Nutrition eşleştirme
→ Tarif tag'leri
→ Backend seed/import formatı
→ PostgreSQL
```

## Backend Import Formatı

```json
{
  "title": "Tavuklu Patates Yemeği",
  "servings": 3,
  "cookingMinutes": 35,
  "tags": ["butce-dostu", "israf-azaltma"],
  "allergens": ["sut"],
  "ingredients": [
    {
      "name": "tavuk",
      "amount": "400 g",
      "estimatedPrice": 0
    }
  ],
  "nutrition": {
    "calories": 520,
    "proteinGrams": 36,
    "carbGrams": 48,
    "fatGrams": 18
  },
  "steps": ["Tavukları mühürleyin.", "Sebzeleri ekleyin."]
}
```

## Alerjen Güvenliği

Alerjen alanında ML tahmini kesin bilgi gibi gösterilmemelidir. Veri kaynağı belirsizse mobil uygulama "içerebilir / doğrulanmalı" uyarısı göstermelidir.

