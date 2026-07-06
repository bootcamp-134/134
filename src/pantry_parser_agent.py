"""Pantry Parser Agent — kullanıcının serbest Türkçe metnini yapılandırılmış İngilizce malzeme listesine çevirir."""

import json

from google import genai

from src.config import GEMINI_API_KEY

_client = genai.Client(api_key=GEMINI_API_KEY)

_SYSTEM_PROMPT = """Sen bir kiler ayrıştırma asistanısın. Kullanıcı Türkçe yazacak,
sen malzemeleri İngilizce'ye çevirip SADECE aşağıdaki JSON formatında cevap ver,
başka hiçbir açıklama, yorum veya markdown bloğu ekleme:

{"ingredients": ["chicken", "onion", "cream of mushroom soup"]}

Kurallar:
- Malzeme isimlerini İngilizce'ye çevir (soğan -> onion, tavuk -> chicken)
- Miktar bilgisi verme, sadece malzeme adı
- Kullanıcının belirttiği her malzemeyi dahil et, uydurma malzeme ekleme"""


def pantry_parser_agent(user_text: str) -> list:
    """Türkçe serbest metni İngilizce malzeme listesine çevirir."""
    response = _client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"{_SYSTEM_PROMPT}\n\nKullanıcı girdisi: {user_text}",
    )

    raw_text = response.text
    clean = raw_text.replace("```json", "").replace("```", "").strip()
    parsed = json.loads(clean)
    return parsed["ingredients"]