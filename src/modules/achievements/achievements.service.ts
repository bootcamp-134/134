import { Injectable } from "@nestjs/common";
import { InMemoryStore } from "../data/in-memory.store";

@Injectable()
export class AchievementsService {
  constructor(private readonly store: InMemoryStore) {}

  getMyAchievements() {
    return this.store.getAchievements(this.store.getDefaultUserId());
  }
}
