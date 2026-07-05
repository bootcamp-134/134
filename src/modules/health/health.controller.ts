import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("health")
@Controller("health")
export class HealthController {
  @Get()
  getHealth() {
    return {
      name: "bereket-ai-backend",
      status: "ok",
      version: "0.1.0",
    };
  }
}

