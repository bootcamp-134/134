# Bereket AI Backend

Bereket AI mobil uygulaması için NestJS tabanlı backend başlangıç projesidir. Bu branch, Flutter mobil istemcinin onboarding, tarif önerisi, tarife özel chat, profil, akış ve achievement ekranlarıyla konuşacağı API omurgasını kurar.

## Teknoloji

- NestJS + TypeScript
- Swagger / OpenAPI
- Prisma ORM v7 schema + PostgreSQL hedefi
- İlk geliştirme için in-memory mock seed data

## Mevcut Durum

- Gerçek database bağlantısı aktif değildir.
- Veriler `InMemoryStore` içinde seed/mock olarak tutulur.
- Auth tokenları gerçek JWT değildir; mobil entegrasyon için mock string döner.
- Tarif önerisi gerçek AI/ML modeli değil, kural tabanlı geliştirme skorudur.
- Swagger staging/demo entegrasyonu için açıktır; production'da `SWAGGER_ENABLED=false` yapılabilir.

## Çalıştırma

```bash
pnpm install
cp .env.example .env
pnpm run dev
```

API varsayılan olarak `http://localhost:3001/api` altında çalışır.

Kontrol komutları:

```bash
pnpm run lint
pnpm run build
```

Swagger dokümanı:

```text
http://localhost:3001/api/docs
```

## İlk Endpointler

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/me`
- `PUT /api/me/onboarding`
- `GET /api/recipes`
- `GET /api/recipes/:id`
- `POST /api/recommendations/recipes`
- `POST /api/recipe-chat/sessions`
- `POST /api/recipe-chat/sessions/:sessionId/messages`
- `GET /api/feed/posts`
- `POST /api/feed/posts`
- `GET /api/achievements/me`

## Not

Bu ilk backend sürümü gerçek AI veya gerçek ML modeli içermez. Tarif önerisi kural tabanlı skorla ve seed veriyle çalışır. Burak'ın veri/ML pipeline'ı olgunlaştıkça seed data PostgreSQL tablolarına taşınacak ve öneri skoru geliştirilecektir.

## Deploy

Önerilen ilk deploy ortamı Vercel staging/dev API projesidir. Vercel güncel olarak NestJS backend'i `src/main.ts` entrypoint'iyle sıfır konfigürasyon deploy edebilir.

Temel ayarlar:

- Branch: `backend`
- Root directory: repo kökü
- Node.js: `24.x`
- Install command: varsayılan bırakılabilir; `pnpm-lock.yaml` üzerinden pnpm algılanır.
- Build command: `pnpm run build`
- Health check: `/api/health`
- Swagger: `/api/docs`

Detaylı notlar için [Deployment Notes](docs/deployment.md) dosyasına bakın.

## Dokümantasyon

- [API Contract](docs/api-contract.md)
- [Backend Roadmap](docs/backend-roadmap.md)
- [Data Pipeline Notes](docs/data-pipeline.md)
- [Deployment Notes](docs/deployment.md)

## Geliştirici

Backend Samet DÖNMEZ ([sawetco](https://github.com/sawetco)) tarafından geliştirilmektedir.
