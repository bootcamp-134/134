import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "samet@bereket.ai" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "Samet Dönmez", required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: "StrongPass123" })
  @IsString()
  @MinLength(6)
  password!: string;
}

export class LoginDto {
  @ApiProperty({ example: "samet@bereket.ai" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "StrongPass123" })
  @IsString()
  @MinLength(6)
  password!: string;
}
