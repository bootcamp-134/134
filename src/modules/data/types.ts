export type IncomeLevel = "low" | "middle" | "high";
export type CookingSkill = "beginner" | "intermediate" | "advanced";

export type UserProfile = {
  fullName: string;
  ageRange?: string;
  householdSize: number;
  incomeLevel: IncomeLevel;
  weeklyFoodBudget?: number;
  dietPreferences: string[];
  allergens: string[];
  dislikedIngredients: string[];
  cookingSkill: CookingSkill;
  availableEquipment: string[];
  shoppingFrequency?: string;
};

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  profile?: UserProfile;
  createdAt: string;
};

export type IngredientLine = {
  name: string;
  amount: string;
  estimatedPrice: number;
  optional?: boolean;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  servings: number;
  cookingMinutes: number;
  difficulty: "Kolay" | "Orta" | "Zor";
  estimatedTotalCost: number;
  tags: string[];
  allergens: string[];
  nutrition: {
    calories: number;
    proteinGrams: number;
    carbGrams: number;
    fatGrams: number;
  };
  ingredients: IngredientLine[];
  steps: string[];
};

export type RecommendationResult = {
  recipeId: string;
  title: string;
  matchScore: number;
  estimatedExtraCost: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  allergenWarnings: string[];
  reason: string;
};

export type RecipeChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type RecipeChatSession = {
  id: string;
  userId: string;
  recipeId: string;
  createdAt: string;
  messages: RecipeChatMessage[];
};

export type FeedPost = {
  id: string;
  userId: string;
  recipeId: string;
  imageUrl: string;
  comment?: string;
  createdAt: string;
};
