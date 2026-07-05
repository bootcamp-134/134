# Backend Roadmap

## Faz 1: Mobil Entegrasyon Omurgası

- NestJS API scaffold
- Swagger/OpenAPI
- Auth register/login mock token
- Onboarding profili
- Seed recipe listesi
- Rule-based recipe recommendation
- Recipe-specific chat session
- Feed post ve temel achievement endpointleri

## Faz 2: Database

- PostgreSQL bağlantısı
- Prisma migration
- Seed script
- Kullanıcı ve tarif verilerinin kalıcı hale getirilmesi
- Auth token akışının gerçek JWT yapısına taşınması

## Faz 3: Veri ve ML Pipeline

- Tarif dataset import scriptleri
- Malzeme normalizasyonu
- Alerjen ve nutrition eşleştirme
- Recommendation feature alanları
- Skor algoritmasının veriyle iyileştirilmesi

## Faz 4: Recipe Chat Agent

- Seçilen tarife özel LLM context
- Güvenlik ve alerjen uyarı guardrail'leri
- Chat geçmişinin database'de saklanması
- Mobil taraf için streaming veya polling stratejisi

