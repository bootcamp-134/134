import '../models/recipe.dart';

abstract final class MockRecipes {
  static const List<Recipe> all = [
    Recipe(
      id: 'chicken-potato',
      title: 'Tavuklu Patates Yemeği',
      description:
          'Tek tencerede hazırlanan, doyurucu ve ev usulü tavuklu patates.',
      preparationMinutes: 45,
      difficulty: 'Kolay',
      ingredients: [
        RecipeIngredient(name: 'Tavuk', amount: '400 g', estimatedCost: 120),
        RecipeIngredient(name: 'Patates', amount: '3 adet', estimatedCost: 25),
        RecipeIngredient(name: 'Soğan', amount: '1 adet', estimatedCost: 12),
        RecipeIngredient(
          name: 'Salça',
          amount: '1 yemek kaşığı',
          estimatedCost: 15,
        ),
        RecipeIngredient(
          name: 'Zeytinyağı',
          amount: '2 yemek kaşığı',
          estimatedCost: 15,
        ),
      ],
      steps: [
        'Tavuğu kuşbaşı, patatesi ve soğanı küp şeklinde doğra.',
        'Soğanı zeytinyağında yumuşayana kadar kavur.',
        'Tavukları ekleyip renk alana kadar pişir.',
        'Salça ve patatesleri ekleyip karıştır.',
        'Üzerini geçecek kadar sıcak su ekleyip 25 dakika pişir.',
      ],
    ),
    Recipe(
      id: 'tomato-pasta',
      title: 'Domatesli Makarna',
      description:
          'Az malzemeyle kısa sürede hazırlanan klasik domatesli makarna.',
      preparationMinutes: 25,
      difficulty: 'Çok kolay',
      ingredients: [
        RecipeIngredient(name: 'Makarna', amount: '1 paket', estimatedCost: 35),
        RecipeIngredient(name: 'Domates', amount: '3 adet', estimatedCost: 20),
        RecipeIngredient(name: 'Soğan', amount: '1 adet', estimatedCost: 12),
        RecipeIngredient(name: 'Sarımsak', amount: '1 diş', estimatedCost: 8),
        RecipeIngredient(
          name: 'Zeytinyağı',
          amount: '2 yemek kaşığı',
          estimatedCost: 15,
        ),
      ],
      steps: [
        'Makarnayı paket üzerindeki süreye göre haşla.',
        'Soğan ve sarımsağı zeytinyağında kavur.',
        'Rendelenmiş domatesleri ekleyip 10 dakika pişir.',
        'Süzülen makarnayı sosa ekleyip iyice karıştır.',
      ],
    ),
    Recipe(
      id: 'lentil-soup',
      title: 'Mercimek Çorbası',
      description:
          'Besleyici kırmızı mercimek, sebzeler ve salçayla hazırlanan sıcak çorba.',
      preparationMinutes: 35,
      difficulty: 'Kolay',
      ingredients: [
        RecipeIngredient(
          name: 'Kırmızı mercimek',
          amount: '1 su bardağı',
          estimatedCost: 45,
        ),
        RecipeIngredient(name: 'Soğan', amount: '1 adet', estimatedCost: 12),
        RecipeIngredient(name: 'Havuç', amount: '1 adet', estimatedCost: 15),
        RecipeIngredient(
          name: 'Salça',
          amount: '1 yemek kaşığı',
          estimatedCost: 15,
        ),
        RecipeIngredient(
          name: 'Zeytinyağı',
          amount: '2 yemek kaşığı',
          estimatedCost: 15,
        ),
      ],
      steps: [
        'Mercimeği su berraklaşana kadar yıka.',
        'Doğranmış soğan ve havucu zeytinyağında kavur.',
        'Salça, mercimek ve sıcak suyu tencereye ekle.',
        'Sebzeler yumuşayana kadar yaklaşık 25 dakika pişir.',
        'Pürüzsüz bir kıvam için blenderdan geçir.',
      ],
    ),
    Recipe(
      id: 'yogurt-potato',
      title: 'Yoğurtlu Patates',
      description:
          'Haşlanmış patatesi sarımsaklı yoğurtla buluşturan ekonomik bir öğün.',
      preparationMinutes: 30,
      difficulty: 'Çok kolay',
      ingredients: [
        RecipeIngredient(name: 'Patates', amount: '4 adet', estimatedCost: 30),
        RecipeIngredient(name: 'Yoğurt', amount: '1 kase', estimatedCost: 30),
        RecipeIngredient(name: 'Sarımsak', amount: '1 diş', estimatedCost: 8),
        RecipeIngredient(
          name: 'Zeytinyağı',
          amount: '1 yemek kaşığı',
          estimatedCost: 10,
        ),
      ],
      steps: [
        'Patatesleri yumuşayana kadar haşla ve küp küp doğra.',
        'Yoğurdu ezilmiş sarımsakla karıştır.',
        'Patatesleri servis tabağına alıp yoğurdu üzerine dök.',
        'Zeytinyağı gezdirerek servis et.',
      ],
    ),
    Recipe(
      id: 'vegetable-bulgur',
      title: 'Sebzeli Bulgur Pilavı',
      description:
          'Bulgur ve mevsim sebzeleriyle hazırlanan bütçe dostu ana yemek.',
      preparationMinutes: 35,
      difficulty: 'Kolay',
      ingredients: [
        RecipeIngredient(
          name: 'Bulgur',
          amount: '1,5 su bardağı',
          estimatedCost: 35,
        ),
        RecipeIngredient(name: 'Domates', amount: '2 adet', estimatedCost: 18),
        RecipeIngredient(name: 'Biber', amount: '2 adet', estimatedCost: 18),
        RecipeIngredient(name: 'Soğan', amount: '1 adet', estimatedCost: 12),
        RecipeIngredient(
          name: 'Salça',
          amount: '1 yemek kaşığı',
          estimatedCost: 15,
        ),
        RecipeIngredient(
          name: 'Zeytinyağı',
          amount: '2 yemek kaşığı',
          estimatedCost: 15,
        ),
      ],
      steps: [
        'Soğan ve biberleri küçük küçük doğra.',
        'Sebzeleri zeytinyağında yumuşayana kadar kavur.',
        'Domates, salça ve yıkanmış bulguru ekleyip karıştır.',
        'Sıcak suyu ekleyip kısık ateşte suyunu çekene kadar pişir.',
        'Ocağı kapatıp 10 dakika dinlendir.',
      ],
    ),
  ];
}
