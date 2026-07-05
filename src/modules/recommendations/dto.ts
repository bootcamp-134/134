import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";

export class RecommendRecipesDto {
  @ApiPropertyOptional({ example: "user_demo" })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ example: ["tavuk", "patates", "yoğurt", "domates"] })
  @IsArray()
  @IsString({ each: true })
  availableIngredients!: string[];

  @ApiProperty({ example: true })
  @IsBoolean()
  wantsToSpendMoney!: boolean;

  @ApiPropertyOptional({ example: 250 })
  @IsOptional()
  @IsInt()
  @Min(0)
  budget?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  @Min(1)
  servings?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  confirmAllergens?: boolean;
}

