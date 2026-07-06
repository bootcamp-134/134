from src.pipeline import full_pipeline

print("Bereket AI - Test Modu")
print("Çıkmak için 'q' yaz ve Enter'a bas.\n")

while True:
    user_text = input("Evinde ne var, ne istiyorsun? (Türkçe yaz): ")
    if user_text.lower().strip() == "q":
        print("Çıkılıyor.")
        break

    restricted_input = input("Alerji/kısıtlama var mı? (virgülle ayır, yoksa boş bırak): ")
    restricted_turkish = [x.strip() for x in restricted_input.split(",") if x.strip()]

    try:
        result = full_pipeline(
            turkish_text=user_text,
            restricted_ingredients_turkish=restricted_turkish,
        )
        print("\n--- Önerilen tarifler ---")
        print(result[["title", "ner_list", "match_score"]].to_string())
        print()
    except Exception as e:
        print(f"Hata oluştu: {e}\n")