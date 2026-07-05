import { Injectable } from "@nestjs/common";
import { InMemoryStore } from "../data/in-memory.store";
import type { RecommendRecipesDto } from "./dto";

@Injectable()
export class RecommendationsService {
  constructor(private readonly store: InMemoryStore) {}

  recommendRecipes(dto: RecommendRecipesDto) {
    const results = this.store.recommendRecipes(dto);

    return {
      generatedBy: "rule-based-dev-recommender",
      results,
    };
  }
}

