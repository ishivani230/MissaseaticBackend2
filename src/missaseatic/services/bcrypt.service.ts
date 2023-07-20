import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class BcryptService{
  compare(password: string, password1: string) {
    throw new Error("Method not implemented.");
  }
    constructor() {}
    async hashPassword(password:string):Promise<any>{
    // const salt=await bcrypt.genSalt(10);
    // const hashedPassword=await bcrypt.hash(password,salt);
    // return hashedPassword;
    return new Promise(async (resolve, reject) => {
      const salt = await bcrypt.genSalt(saltOrRounds);
      await bcrypt.hash(password,salt).then(pass => resolve(pass)).catch(error => reject(error))
    })
}
  async comparePasswords(payloadPassword:string,dbPassword:string):Promise<boolean>{
   return await bcrypt.compare(payloadPassword,dbPassword);

}
}