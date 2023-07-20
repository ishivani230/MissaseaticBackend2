import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,   IsString,Length,Matches} from "class-validator";


export class judgelogin {
    
    @ApiProperty()
    email:string
    //@regex(^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$)
    @ApiProperty()
    @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')
    @IsString()
    password:string

    @ApiProperty()
    createdAt :Date
    
    @ApiProperty()
    updatedAt:Date
    // @IsString()
    // password:string
    //@Matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g,{message:"please enter with country code mobile number"})

}
