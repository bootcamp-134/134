import { Injectable } from "@nestjs/common";
import { InMemoryStore } from "../data/in-memory.store";
import type {
  CreateRecipeChatSessionDto,
  SendRecipeChatMessageDto,
} from "./dto";

function buildRecipeAssistantReply(recipeTitle: string, message: string) {
  const normalizedMessage = message.toLocaleLowerCase("tr-TR");

  if (normalizedMessage.includes("alerj")) {
    return `${recipeTitle} için alerjen bilgisini tarif detayındaki içeriklerden kontrol etmelisin. Emin olunmayan ürünlerde paket etiketi ve uzman görüşü önceliklidir.`;
  }

  if (
    normalizedMessage.includes("fırın") ||
    normalizedMessage.includes("tencere")
  ) {
    return `${recipeTitle} tarifinde ekipman değişikliği yapılabilir. Isıyı daha düşük tutup pişirme süresini kontrollü uzatman iyi olur.`;
  }

  if (
    normalizedMessage.includes("kaç dakika") ||
    normalizedMessage.includes("süre")
  ) {
    return `${recipeTitle} için pişirme süresini tarif detayındaki dakikaya yakın tut; sebze veya et kalınlığına göre 5-10 dakika oynayabilir.`;
  }

  return `${recipeTitle} tarifi için yardımcı olayım. Malzemeleri önceden hazırlayıp adımları sırayla takip edersen sonuç daha tutarlı olur.`;
}

@Injectable()
export class RecipeChatService {
  constructor(private readonly store: InMemoryStore) {}

  createSession(dto: CreateRecipeChatSessionDto) {
    const userId = dto.userId ?? this.store.getDefaultUserId();
    const session = this.store.createChatSession(userId, dto.recipeId);
    const recipe = this.store.getRecipe(dto.recipeId);

    return {
      recipe,
      session,
    };
  }

  listMessages(sessionId: string) {
    return this.store.getChatSession(sessionId).messages;
  }

  sendMessage(sessionId: string, dto: SendRecipeChatMessageDto) {
    const session = this.store.getChatSession(sessionId);
    const recipe = this.store.getRecipe(session.recipeId);
    const userMessage = this.store.addChatMessage(
      sessionId,
      "user",
      dto.message,
    );
    const assistantMessage = this.store.addChatMessage(
      sessionId,
      "assistant",
      buildRecipeAssistantReply(recipe.title, dto.message),
    );

    return {
      assistantMessage,
      userMessage,
    };
  }
}
