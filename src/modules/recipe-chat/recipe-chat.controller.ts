import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateRecipeChatSessionDto, SendRecipeChatMessageDto } from "./dto";
import { RecipeChatService } from "./recipe-chat.service";

@ApiTags("recipe-chat")
@Controller("recipe-chat")
export class RecipeChatController {
  constructor(private readonly recipeChatService: RecipeChatService) {}

  @Post("sessions")
  createSession(@Body() dto: CreateRecipeChatSessionDto) {
    return this.recipeChatService.createSession(dto);
  }

  @Get("sessions/:sessionId/messages")
  listMessages(@Param("sessionId") sessionId: string) {
    return this.recipeChatService.listMessages(sessionId);
  }

  @Post("sessions/:sessionId/messages")
  sendMessage(
    @Param("sessionId") sessionId: string,
    @Body() dto: SendRecipeChatMessageDto,
  ) {
    return this.recipeChatService.sendMessage(sessionId, dto);
  }
}

