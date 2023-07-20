import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDto {
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  contactNumber: string;
  
  @IsString()
  @IsOptional()
  country: string;
}
