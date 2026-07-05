import { Module } from "@nestjs/common";
import { DataModule } from "../data/data.module";
import { RecommendationsController } from "./recommendations.controller";
import { RecommendationsService } from "./recommendations.service";

@Module({
  controllers: [RecommendationsController],
  imports: [DataModule],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
