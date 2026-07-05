import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import type { CookingSkill, IncomeLevel } from "../data/types";

export class OnboardingDto {
  @ApiProperty({ example: "Samet Dönmez" })
  @IsString()
  fullName!: string;

  @ApiProperty({ example: "25-34", required: false })
  @IsOptional()
  @IsString()
  ageRange?: string;

  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  householdSize!: number;

  @ApiProperty({ enum: ["low", "middle", "high"], example: "middle" })
  @IsIn(["low", "middle", "high"])
  incomeLevel!: IncomeLevel;

  @ApiProperty({ example: 900, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  weeklyFoodBudget?: number;

  @ApiProperty({ example: ["balanced"] })
  @IsArray()
  @IsString({ each: true })
  dietPreferences!: string[];

  @ApiProperty({ example: ["yer fistigi", "sut"] })
  @IsArray()
  @IsString({ each: true })
  allergens!: string[];

  @ApiProperty({ example: ["mantar"] })
  @IsArray()
  @IsString({ each: true })
  dislikedIngredients!: string[];

  @ApiProperty({
    enum: ["beginner", "intermediate", "advanced"],
    example: "beginner",
  })
  @IsIn(["beginner", "intermediate", "advanced"])
  cookingSkill!: CookingSkill;

  @ApiProperty({ example: ["ocak", "firin"] })
  @IsArray()
  @ArrayMinSize(0)
  @IsString({ each: true })
  availableEquipment!: string[];

  @ApiProperty({ example: "weekly", required: false })
  @IsOptional()
  @IsString()
  shoppingFrequency?: string;
}
