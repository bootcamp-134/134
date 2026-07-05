import { Module } from "@nestjs/common";
import { DataModule } from "../data/data.module";
import { RecipeChatController } from "./recipe-chat.controller";
import { RecipeChatService } from "./recipe-chat.service";

@Module({
  controllers: [RecipeChatController],
  imports: [DataModule],
  providers: [RecipeChatService],
})
export class RecipeChatModule {}

