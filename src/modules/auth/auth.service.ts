import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InMemoryStore } from "../data/in-memory.store";
import type { LoginDto, RegisterDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(private readonly store: InMemoryStore) {}

  register(dto: RegisterDto) {
    const user = this.store.createUser(dto.email, dto.password, dto.fullName);
    return this.toAuthResponse(user.id, user.email);
  }

  login(dto: LoginDto) {
    const user = this.store.findUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException("E-posta veya şifre hatalı.");
    }

    return this.toAuthResponse(user.id, user.email);
  }

  private toAuthResponse(userId: string, email: string) {
    return {
      accessToken: `dev-access-token:${userId}`,
      expiresIn: 3600,
      refreshToken: `dev-refresh-token:${userId}`,
      tokenType: "Bearer",
      user: {
        email,
        id: userId,
      },
    };
  }
}
