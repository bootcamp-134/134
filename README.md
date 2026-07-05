# Bereket AI Backend

Bereket AI mobil uygulaması için NestJS tabanlı backend başlangıç projesidir. Bu branch, Flutter mobil istemcinin onboarding, tarif önerisi, tarife özel chat, profil, akış ve achievement ekranlarıyla konuşacağı API omurgasını kurar.

## Teknoloji

- NestJS + TypeScript
- Swagger / OpenAPI
- Prisma schema + PostgreSQL hedefi
- İlk geliştirme için in-memory mock seed data

## Çalıştırma

```bash
pnpm install
cp .env.example .env
pnpm run dev
```

API varsayılan olarak `http://localhost:3001/api` altında çalışır.

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

## Dokümantasyon

- [API Contract](docs/api-contract.md)
- [Backend Roadmap](docs/backend-roadmap.md)
- [Data Pipeline Notes](docs/data-pipeline.md)

