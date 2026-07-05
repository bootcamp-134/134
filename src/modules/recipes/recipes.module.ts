import { Module } from "@nestjs/common";
import { DataModule } from "../data/data.module";
import { RecipesController } from "./recipes.controller";
import { RecipesService } from "./recipes.service";

@Module({
  controllers: [RecipesController],
  imports: [DataModule],
  providers: [RecipesService],
})
export class RecipesModule {}

