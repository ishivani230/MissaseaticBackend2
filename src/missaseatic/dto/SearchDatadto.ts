import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UserFindAllDto {
  @IsOptional()
  id: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  middleName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  dateOfBirth: Date;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  contactNumber: number;

  @IsOptional()
  emergencyContactName: string;

  @IsOptional()
  emergencyContactNumber: number;

  @IsOptional()
  educationalQualification: string;

  @IsOptional()
  hobbiesTalents: string;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  weight: number;

  @IsOptional()
  bust: number;

  @IsOptional()
  waist: number;

  @IsOptional()
  hip: number;

  @IsOptional()
  describeYourself: string;

  @IsOptional()
  @IsString()
  personalWebsite: string;

  @IsOptional()
  @IsString()
  title1: string;

  @IsOptional()
  title2: string;

  @IsOptional()
  proofOfIdentity: string;

  @IsOptional()
  indianPassport: string;

  @IsOptional()
  oci: string;

  @IsOptional()
  remark1: string;

  @IsOptional()
  remark2: string;

  @IsOptional()
  remark3: string;

  @IsOptional()
  remark4: string;

  @IsOptional()
  @IsString()
  remark5: string;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  isVerified: boolean;

  @IsOptional()
  processingStatus: boolean;

  @IsOptional()
  role: string

  @IsOptional()
  judgeId: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  locality: string;

  @IsOptional()
  @IsString()
  postCode: string;

  @IsOptional()
  @IsString()
  country: string;
  
  @IsOptional()
  line1: string;

  @IsOptional()
  line2: string;

  @IsOptional()
  @IsString()
  zone: string;
}
