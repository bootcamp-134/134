import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AchievementsService } from "./achievements.service";

@ApiTags("achievements")
@Controller("achievements")
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get("me")
  getMyAchievements() {
    return this.achievementsService.getMyAchievements();
  }
}
