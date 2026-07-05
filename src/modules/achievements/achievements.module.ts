import { Module } from "@nestjs/common";
import { DataModule } from "../data/data.module";
import { AchievementsController } from "./achievements.controller";
import { AchievementsService } from "./achievements.service";

@Module({
  controllers: [AchievementsController],
  imports: [DataModule],
  providers: [AchievementsService],
})
export class AchievementsModule {}

