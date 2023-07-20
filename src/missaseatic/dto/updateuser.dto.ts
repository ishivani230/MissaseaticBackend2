import { IsOptional, MinLength, MaxLength, IsEmail, IsNumber, Min, IsString, IsEnum } from "class-validator";

enum AddressType {
  RESIDENTIAL,
  OFFICE
};

export class UserUpdateData {

  @IsOptional()
  id: string;

  @IsOptional()
  judgeId: string;

  @IsOptional()
  @MinLength(2, { message: "Please enter minimum 2 characters of firstname" })
  @MaxLength(30, { message: "Please enter valid number firstName" })
  firstName: string;

  // @MinLength(2, { message: "Please enter minimum 2 characters middlename" })
  // @MaxLength(30, { message: "Please enter valid middleName" })
  @IsOptional()
  middleName: string;

  @IsOptional()
  @MinLength(2, { message: "Please enter minimum 2 characters" })
  @MaxLength(30, { message: "Please enter valid name" })
  lastName: string;

  @IsOptional()
  dateOfBirth: Date;

  @IsOptional()
  age:number

  @IsOptional()
  @MinLength(2, { message: "Please enter minimum 2 characters name" })
  @MaxLength(50, { message: "Please enter valid name" })
  emergencyContactName: string;

  @IsOptional()
  emergencyContactNumber: string;

  @IsOptional()
  educationalQualification: string;

  @IsOptional()
  hobbiesTalents: string;

  @IsOptional()
  @IsNumber()
  @Min(155, { message: "Height should not be less than 155 cm." })
  height: number;

  @IsOptional()
  weight: number;


  @IsOptional()
  instagramProfile:string

  @IsOptional()
  bust: number;

  @IsOptional()
  waist: number;

  @IsOptional()
  hip: number;

  // @IsOptional()
  // highestEducationalLevel: string;

  @IsOptional()
  @MinLength(50, { message: "please enter atleast 10 words describe yourself" })
  
  @MaxLength(100, { message: "No more than 50 words" })
  describeYourself: string;

  

  @IsOptional()
  @IsString()
  personalWebsite: string;

 
 
  @IsOptional()
  @IsString()
  title1: string;

  @IsOptional()
  @IsString()
  title2: string;

  @IsOptional()
  proofOfIdentity: string;
  

  @IsOptional()
  @IsString()
  remark1: string;

  @IsOptional()
  @IsString()
  remark2: string;

  @IsOptional()
  @IsString()
  remark3: string;

  @IsOptional()
  @IsString()
  remark4: string;

  @IsOptional()
  @IsString()
  remark5: string;

  @IsOptional()
  isActive: boolean;


  


  @IsOptional()
  line1: string;

  @IsOptional()
  line2: string;

  @IsOptional()
  @IsEnum(AddressType)
  addressType :string;

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
  indianPassport: string;

  @IsOptional()
  @IsString()
  oci: string;

  @IsOptional()
  @IsString()
  zone:string

}
