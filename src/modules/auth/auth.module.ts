import { Module } from "@nestjs/common";
import { DataModule } from "../data/data.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  imports: [DataModule],
  providers: [AuthService],
})
export class AuthModule {}
