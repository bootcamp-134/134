import '../models/recommendation.dart';

abstract interface class RecommendationService {
  Future<List<RecipeRecommendation>> recommend(RecommendationRequest request);
}
