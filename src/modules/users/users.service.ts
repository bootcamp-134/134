import { Injectable } from "@nestjs/common";
import { InMemoryStore } from "../data/in-memory.store";
import type { OnboardingDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(private readonly store: InMemoryStore) {}

  getMe() {
    return this.store.getUser();
  }

  updateOnboarding(dto: OnboardingDto) {
    return this.store.updateProfile(this.store.getDefaultUserId(), dto);
  }
}
