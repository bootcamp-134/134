import { Injectable } from "@nestjs/common";
import { InMemoryStore } from "../data/in-memory.store";
import type { RecipeQueryDto } from "./dto";

@Injectable()
export class RecipesService {
  constructor(private readonly store: InMemoryStore) {}

  listRecipes(query: RecipeQueryDto) {
    const allergenFree = query.allergenFree
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    return this.store.listRecipes(query.search, query.tag, allergenFree);
  }

  getRecipe(recipeId: string) {
    return this.store.getRecipe(recipeId);
  }
}
