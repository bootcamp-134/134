import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { seedRecipes, seedUsers } from "./seed";
import type {
  FeedPost,
  Recipe,
  RecipeChatMessage,
  RecipeChatSession,
  RecommendationResult,
  User,
  UserProfile,
} from "./types";

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR");
}

function intersects(left: string[], right: string[]) {
  const normalizedRight = new Set(right.map(normalize));
  return left.some((item) => normalizedRight.has(normalize(item)));
}

@Injectable()
export class InMemoryStore {
  private readonly users = [...seedUsers];
  private readonly recipes = [...seedRecipes];
  private readonly chatSessions: RecipeChatSession[] = [];
  private readonly feedPosts: FeedPost[] = [];

  getDefaultUserId() {
    return this.users[0].id;
  }

  createUser(email: string, password: string, fullName?: string) {
    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      return existingUser;
    }

    const user: User = {
      createdAt: new Date().toISOString(),
      email,
      id: `user_${randomUUID()}`,
      passwordHash: `dev-hash:${password}`,
      profile: fullName
        ? {
            allergens: [],
            availableEquipment: [],
            cookingSkill: "beginner",
            dietPreferences: [],
            dislikedIngredients: [],
            fullName,
            householdSize: 1,
            incomeLevel: "middle",
          }
        : undefined,
    };

    this.users.push(user);
    return user;
  }

  findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  getUser(userId = this.getDefaultUserId()) {
    const user = this.users.find((item) => item.id === userId);
    if (!user) {
      throw new NotFoundException("Kullanıcı bulunamadı.");
    }
    return user;
  }

  updateProfile(userId: string, profile: UserProfile) {
    const user = this.getUser(userId);
    user.profile = profile;
    return user;
  }

  listRecipes(search?: string, tag?: string, allergenFree?: string[]) {
    return this.recipes.filter((recipe) => {
      const matchesSearch = search
        ? normalize(recipe.title).includes(normalize(search)) ||
          normalize(recipe.description).includes(normalize(search))
        : true;
      const matchesTag = tag ? recipe.tags.map(normalize).includes(normalize(tag)) : true;
      const avoidsAllergens = allergenFree?.length
        ? !intersects(recipe.allergens, allergenFree)
        : true;

      return matchesSearch && matchesTag && avoidsAllergens;
    });
  }

  getRecipe(recipeId: string) {
    const recipe = this.recipes.find((item) => item.id === recipeId);
    if (!recipe) {
      throw new NotFoundException("Tarif bulunamadı.");
    }
    return recipe;
  }

  recommendRecipes(input: {
    userId?: string;
    availableIngredients: string[];
    wantsToSpendMoney: boolean;
    budget?: number;
    servings?: number;
    confirmAllergens?: boolean;
  }): RecommendationResult[] {
    const user = this.getUser(input.userId ?? this.getDefaultUserId());
    const profile = user.profile;
    const available = new Set(input.availableIngredients.map(normalize));
    const allergens = profile?.allergens ?? [];
    const budget = input.wantsToSpendMoney ? (input.budget ?? profile?.weeklyFoodBudget ?? 0) : 0;

    return this.recipes
      .map((recipe) => {
        const hasHardAllergenConflict = input.confirmAllergens && intersects(recipe.allergens, allergens);
        const matchedIngredients = recipe.ingredients
          .filter((ingredient) => available.has(normalize(ingredient.name)))
          .map((ingredient) => ingredient.name);
        const missingIngredientLines = recipe.ingredients.filter(
          (ingredient) => !available.has(normalize(ingredient.name)) && !ingredient.optional,
        );
        const missingIngredients = missingIngredientLines.map((ingredient) => ingredient.name);
        const estimatedExtraCost = missingIngredientLines.reduce(
          (sum, ingredient) => sum + ingredient.estimatedPrice,
          0,
        );
        const ingredientScore = Math.round((matchedIngredients.length / recipe.ingredients.length) * 55);
        const budgetScore =
          !input.wantsToSpendMoney && estimatedExtraCost > 0
            ? 0
            : budget === 0
              ? 15
              : Math.max(0, 25 - Math.round((estimatedExtraCost / Math.max(budget, 1)) * 20));
        const allergyScore = hasHardAllergenConflict ? -100 : recipe.allergens.length === 0 ? 15 : 8;
        const servingsScore = input.servings && recipe.servings >= input.servings ? 5 : 2;
        const difficultyScore = recipe.difficulty === "Kolay" ? 5 : 3;
        const matchScore = Math.max(
          0,
          Math.min(100, ingredientScore + budgetScore + allergyScore + servingsScore + difficultyScore),
        );

        return {
          allergenWarnings: hasHardAllergenConflict
            ? [`${recipe.title} kullanıcının alerjenleriyle çakışıyor.`]
            : recipe.allergens.map((allergen) => `${allergen} içerebilir.`),
          estimatedExtraCost,
          matchedIngredients,
          matchScore,
          missingIngredients,
          reason:
            estimatedExtraCost === 0
              ? "Evdeki malzemeler tarif için yeterli görünüyor."
              : `${matchedIngredients.length} mevcut malzemeyi kullanır; tahmini ek maliyet ${estimatedExtraCost} TL.`,
          recipeId: recipe.id,
          title: recipe.title,
        };
      })
      .filter((result) => result.matchScore > 0)
      .sort((left, right) => right.matchScore - left.matchScore)
      .slice(0, 5);
  }

  createChatSession(userId: string, recipeId: string) {
    this.getUser(userId);
    this.getRecipe(recipeId);

    const session: RecipeChatSession = {
      createdAt: new Date().toISOString(),
      id: `session_${randomUUID()}`,
      messages: [],
      recipeId,
      userId,
    };

    this.chatSessions.push(session);
    return session;
  }

  getChatSession(sessionId: string) {
    const session = this.chatSessions.find((item) => item.id === sessionId);
    if (!session) {
      throw new NotFoundException("Chat oturumu bulunamadı.");
    }
    return session;
  }

  addChatMessage(sessionId: string, role: RecipeChatMessage["role"], content: string) {
    const session = this.getChatSession(sessionId);
    const message: RecipeChatMessage = {
      content,
      createdAt: new Date().toISOString(),
      id: `message_${randomUUID()}`,
      role,
    };

    session.messages.push(message);
    return message;
  }

  createFeedPost(input: Omit<FeedPost, "createdAt" | "id">) {
    this.getUser(input.userId);
    this.getRecipe(input.recipeId);

    const post: FeedPost = {
      ...input,
      createdAt: new Date().toISOString(),
      id: `post_${randomUUID()}`,
    };

    this.feedPosts.unshift(post);
    return post;
  }

  listFeedPosts() {
    return this.feedPosts;
  }

  getAchievements(userId: string) {
    this.getUser(userId);
    const userPostCount = this.feedPosts.filter((post) => post.userId === userId).length;

    return [
      {
        code: "FIRST_RECIPE_SHARED",
        description: "İlk yemek fotoğrafını akışta paylaş.",
        progress: Math.min(userPostCount, 1),
        target: 1,
        title: "İlk Tabağım",
        unlocked: userPostCount >= 1,
      },
      {
        code: "FIVE_RECIPES_SHARED",
        description: "5 farklı yemek paylaşımı yap.",
        progress: Math.min(userPostCount, 5),
        target: 5,
        title: "Bereketli Mutfak",
        unlocked: userPostCount >= 5,
      },
    ];
  }
}

