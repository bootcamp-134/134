import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AchievementsModule } from "./modules/achievements/achievements.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DataModule } from "./modules/data/data.module";
import { FeedModule } from "./modules/feed/feed.module";
import { HealthModule } from "./modules/health/health.module";
import { RecipeChatModule } from "./modules/recipe-chat/recipe-chat.module";
import { RecipesModule } from "./modules/recipes/recipes.module";
import { RecommendationsModule } from "./modules/recommendations/recommendations.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataModule,
    HealthModule,
    AuthModule,
    UsersModule,
    RecipesModule,
    RecommendationsModule,
    RecipeChatModule,
    FeedModule,
    AchievementsModule,
  ],
})
export class AppModule {}

