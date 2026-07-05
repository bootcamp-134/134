# Bereket AI API Contract

Base URL:

```text
http://localhost:3001/api
```

Swagger:

```text
http://localhost:3001/api/docs
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

## Akış

### `POST /feed/posts`

```json
{
  "recipeId": "recipe_tavuklu_patates",
  "imageUrl": "https://cdn.example.com/uploads/tavuklu-patates.jpg",
  "comment": "Biber yoktu, domatesi biraz artırdım."
}
```

## Achievement

### `GET /achievements/me`

Kullanıcının başarımlarını ve ilerleme durumunu döner.

