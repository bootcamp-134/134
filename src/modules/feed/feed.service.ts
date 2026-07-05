import { Injectable } from "@nestjs/common";
import { InMemoryStore } from "../data/in-memory.store";
import type { CreateFeedPostDto } from "./dto";

@Injectable()
export class FeedService {
  constructor(private readonly store: InMemoryStore) {}

  listPosts() {
    return this.store.listFeedPosts();
  }

  createPost(dto: CreateFeedPostDto) {
    return this.store.createFeedPost({
      comment: dto.comment,
      imageUrl: dto.imageUrl,
      recipeId: dto.recipeId,
      userId: dto.userId ?? this.store.getDefaultUserId(),
    });
  }
}
