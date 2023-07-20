import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { Hash } from "crypto";

export class JudgeDataDto {
  @IsOptional()
  id: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName: String;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  @IsEmail()
  email: string;

  // @Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
  @IsString()
  password: string;

  @IsOptional()
  contactNumber: string;

  @IsOptional()
  auditionLevel: number;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  zoomLink: string;

  @IsOptional()
  zone: string;
}
