import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class RecipeQueryDto {
  @ApiPropertyOptional({ example: "makarna" })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: "butce-dostu" })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiPropertyOptional({
    description: "Comma separated allergen names to exclude.",
    example: "sut,gluten",
  })
  @IsOptional()
  @IsString()
  allergenFree?: string;
}
