import { Body, Controller, Get, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { OnboardingDto } from "./dto";
import { UsersService } from "./users.service";

@ApiBearerAuth()
@ApiTags("users")
@Controller("me")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getMe() {
    return this.usersService.getMe();
  }

  @Put("onboarding")
  updateOnboarding(@Body() dto: OnboardingDto) {
    return this.usersService.updateOnboarding(dto);
  }
}
