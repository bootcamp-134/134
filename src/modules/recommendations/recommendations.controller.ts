import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RecommendRecipesDto } from "./dto";
import { RecommendationsService } from "./recommendations.service";

@ApiTags("recommendations")
@Controller("recommendations")
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Post("recipes")
  recommendRecipes(@Body() dto: RecommendRecipesDto) {
    return this.recommendationsService.recommendRecipes(dto);
  }
}
