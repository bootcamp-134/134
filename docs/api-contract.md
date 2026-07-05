# Bereket AI API Contract

Base URL:

```text
http://localhost:3001/api
```

Swagger:

```text
http://localhost:3001/api/docs
```

Not: Staging deploy sonrası bu değer Vercel proje URL'siyle değişir.

## Durum Notu

Bu API sözleşmesi ilk mobil entegrasyon içindir. Şu anda data in-memory seed veriden gelir, gerçek database ve gerçek JWT auth aktif değildir.

## Health

### `GET /health`

Backend'in ayakta olduğunu doğrular.

```json
{
  "name": "bereket-ai-backend",
  "status": "ok",
  "version": "0.1.0"
}
```

## Auth

### `POST /auth/register`

```json
{
  "email": "samet@bereket.ai",
  "password": "StrongPass123",
  "fullName": "Samet Dönmez"
}
```

### `POST /auth/login`

```json
{
  "email": "samet@bereket.ai",
  "password": "StrongPass123"
}
```

İlk geliştirme sürümünde tokenlar dev amaçlı mock string olarak üretilir.

Response içinde dönen token mobil tarafın auth header entegrasyonunu prova etmesi içindir:

```text
Authorization: Bearer <token>
```

Mevcut sürümde endpoint'ler bu token'ı zorunlu tutmaz.

## Onboarding

### `PUT /me/onboarding`

```json
{
  "fullName": "Samet Dönmez",
  "ageRange": "25-34",
  "householdSize": 3,
  "incomeLevel": "middle",
  "weeklyFoodBudget": 900,
  "dietPreferences": ["balanced"],
  "allergens": ["yer fistigi", "sut"],
  "dislikedIngredients": ["mantar"],
  "cookingSkill": "beginner",
  "availableEquipment": ["ocak", "firin"],
  "shoppingFrequency": "weekly"
}
```

## Ne Yesem?

### `POST /recommendations/recipes`

```json
{
  "availableIngredients": ["tavuk", "patates", "yoğurt", "domates"],
  "wantsToSpendMoney": true,
  "budget": 250,
  "servings": 3,
  "confirmAllergens": true
}
```

Response, tarif skorlarını, eksik malzemeleri, tahmini ek maliyeti ve neden önerildi açıklamasını döner.

Örnek response şekli:

```json
{
  "generatedBy": "rule-based-dev-recommender",
  "results": [
    {
      "recipeId": "recipe_domatesli_makarna",
      "title": "Domatesli Makarna",
      "matchScore": 74,
      "estimatedExtraCost": 75,
      "matchedIngredients": ["makarna", "domates", "soğan"],
      "missingIngredients": ["salça", "baharat"],
      "allergenWarnings": ["gluten içerebilir."],
      "reason": "3 mevcut malzemeyi kullanır; tahmini ek maliyet 75 TL."
    }
  ]
}
```

## Tarifler

### `GET /recipes`

Query parametreleri:

- `search`
- `tag`
- `allergenFree` comma separated: `sut,gluten`

### `GET /recipes/:id`

Tarif detayını, malzemeleri, adımları, alerjenleri ve besin değerlerini döner.

## Tarife Özel Chat

### `POST /recipe-chat/sessions`

```json
{
  "userId": "user_demo",
  "recipeId": "recipe_tavuklu_patates"
}
```

### `POST /recipe-chat/sessions/:sessionId/messages`

```json
{
  "message": "Fırınım yoksa bunu tencerede yapabilir miyim?"
}
```

İlk sürümde cevaplar mock agent mantığıyla üretilir. Gelecekte LLM yalnızca seçili tarif context'iyle sınırlandırılacaktır.

### `GET /recipe-chat/sessions/:sessionId/messages`

Seçili chat session içindeki mesajları döner.

## Akış

### `POST /feed/posts`

```json
{
  "userId": "user_demo",
  "recipeId": "recipe_tavuklu_patates",
  "imageUrl": "https://cdn.example.com/uploads/tavuklu-patates.jpg",
  "comment": "Biber yoktu, domatesi biraz artırdım."
}
```

Bu sürümde dosya upload yoktur. Mobil taraf şimdilik URL gönderir.

## Achievement

### `GET /achievements/me`

Kullanıcının başarımlarını ve ilerleme durumunu döner.
