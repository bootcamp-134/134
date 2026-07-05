# Deployment Notes

Bu dosya backend branch'inin staging/demo ortamına nasıl alınacağını ve hangi sınırlara sahip olduğunu açıklar.

## Environment Variables

Staging/demo için:

```text
PORT=3001
SWAGGER_ENABLED=true
CORS_ORIGIN=https://mobil-preview-url.example
JWT_SECRET=staging-only-change-me
DATABASE_URL=postgresql://placeholder
```

Notlar:

- Vercel kendi `PORT` değerini sağlayabilir; lokal geliştirme için `3001` kullanılır.
- `DATABASE_URL` şu an aktif kullanılmaz, Prisma schema hedefi için yer tutucudur.
- `JWT_SECRET` şu an gerçek JWT üretiminde kullanılmaz, sonraki auth fazı için hazır tutulur.
- `CORS_ORIGIN` virgülle ayrılmış origin listesi alır. Boş bırakılırsa tüm origin'lere izin verilir.
- `SWAGGER_ENABLED=false` yapıldığında `/api/docs` kapatılır.

## Deploy Sonrası Kontrol

```text
GET https://<project-url>/api/health
GET https://<project-url>/api/docs
GET https://<project-url>/api/recipes
POST https://<project-url>/api/recommendations/recipes
```

Health response örneği:

```json
{
  "name": "bereket-ai-backend",
  "status": "ok",
  "version": "0.1.0"
}
```

## Mevcut Sınırlar

- Gerçek database yoktur.
- Auth mock token döndürür.
- Feed görsel yükleme yapmaz, sadece `imageUrl` kabul eder.
- Recipe chat gerçek LLM'e bağlı değildir.
- Recommendation sonucu seed tariflere göre kural tabanlı üretilir.

## Database Fazı Geldiğinde

Prisma ORM v7 kullanıldığı için database bağlantı URL'i `schema.prisma` içinde değil, proje kökündeki `prisma.config.ts` dosyasında yönetilir. `schema.prisma` model ve datasource provider bilgisini tutar.

Prisma Client aktif kullanılmaya başladığında Vercel build sırasında Prisma Client'ın güncel üretilmesi gerekir. Bunun için `postinstall` veya özel build komutuna `prisma generate` eklenmelidir. Migration aşamasında `prisma migrate deploy` ayrıca planlanmalıdır.

Önerilen database seçenekleri:

- Prisma Postgres veya Neon Postgres
- Vercel Marketplace üzerinden yönetilen Postgres
- Preview ve production için ayrı database kullanımı

## Güvenlik Fazı Geldiğinde

Production öncesi tamamlanması gerekenler:

- Gerçek JWT access/refresh token akışı
- Password hashleme
- Auth guard ve role/owner kontrolleri
- Rate limit
- Swagger erişimini kapatma veya koruma
- CORS origin allowlist
- Request logging ve hata takibi
- Dosya yükleme için güvenli storage ve MIME/size kontrolü
