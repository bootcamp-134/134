class RecipeIngredient {
  final String name;
  final String amount;
  final int estimatedCost;

  const RecipeIngredient({
    required this.name,
    required this.amount,
    required this.estimatedCost,
  });
}

class Recipe {
  final String id;
  final String title;
  final String description;
  final int preparationMinutes;
  final String difficulty;
  final List<RecipeIngredient> ingredients;
  final List<String> steps;

  const Recipe({
    required this.id,
    required this.title,
    required this.description,
    required this.preparationMinutes,
    required this.difficulty,
    required this.ingredients,
    required this.steps,
  });
}
