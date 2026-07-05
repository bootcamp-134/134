import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateRecipeChatSessionDto {
  @ApiProperty({ example: "recipe_tavuklu_patates" })
  @IsString()
  recipeId!: string;

  @ApiPropertyOptional({ example: "user_demo" })
  @IsOptional()
  @IsString()
  userId?: string;
}

export class SendRecipeChatMessageDto {
  @ApiProperty({ example: "Fırınım yoksa bunu tencerede yapabilir miyim?" })
  @IsString()
  message!: string;
}
