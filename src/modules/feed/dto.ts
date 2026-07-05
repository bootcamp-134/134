import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreateFeedPostDto {
  @ApiPropertyOptional({ example: "user_demo" })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ example: "recipe_tavuklu_patates" })
  @IsString()
  recipeId!: string;

  @ApiProperty({ example: "https://cdn.example.com/uploads/tavuklu-patates.jpg" })
  @IsUrl()
  imageUrl!: string;

  @ApiPropertyOptional({ example: "Biberim yoktu, domatesi biraz artırdım." })
  @IsOptional()
  @IsString()
  comment?: string;
}

