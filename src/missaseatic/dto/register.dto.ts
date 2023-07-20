import { ApiProperty } from "@nestjs/swagger";
import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    Length,
    Matches,
    MaxLength,
    MinLength,
    ValidatorConstraint,
} from "class-validator";

export class user_registerdto {
    @IsOptional()
    id: String;

    
    @IsString({ message: "Please enter only charcters" })
    @IsNotEmpty()
    fullName: string;

    @IsEmail({ message: "please enter valid email" })
    email: string;

    @IsNumberString()
   // @Length(10, 10, { message: "Phone number should have exactly 10 digits" })
    phoneNumber: string;

    //@regex(^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$)

    @Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    @IsString()
    password: string;

    @IsOptional()
    level: number;

    @IsOptional()
    assignValue: number;

    @IsOptional()
    zone: string;

    @IsString()
    @IsOptional()
    role: string;

   // @IsDate()
    createdAt: Date;

   // @IsDate()
    updatedAt: Date;
   
}