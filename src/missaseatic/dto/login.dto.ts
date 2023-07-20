import { IsEmail, IsString, Length, Matches } from "class-validator";

export class LoginDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
