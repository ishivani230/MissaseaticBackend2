import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
export const jwtSecret = "zjP9h6ZI5LoSKCRj";

import { BcryptService } from "../services/bcrypt.service";
import { AuthService } from "../services/auth.service";
import { LoginDTO } from "../dto/login.dto";
// import { jwtSecretAccess } from "./user.repository";

const saltOrRounds = 10;

@Injectable()
export class JudgeRepository {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private bcrypt: BcryptService,
    private authService: AuthService,
  ) {}

  //create judge
  async createOne(judgedto: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const hash = await this.bcrypt.hashPassword(judgedto?.password);
      let email = judgedto?.email
      const JudgeExist = await this.findOne({email});
      if (JudgeExist) {
       throw new Error("User already exist.");
      //  return {status:201,message:"User Already Exist"}
        
      }

      await this.prisma.judge.create({
        data: {
          firstName: judgedto.firstName,
          middleName: judgedto.middleName,
          lastName: judgedto.lastName,
          auditionLevel: judgedto.auditionLevel,
          email: judgedto.email,
          password: hash,
          contactNumber: judgedto.contactNumber,
          zoomLink: judgedto.zoomLink,
          isActive: judgedto.isActive,
          zone: judgedto.zone,
        },
        include: { users: true },
      })
        .then((user) => resolve(user))
        .catch((error) => reject(error))
        .finally(() => this.prisma.$disconnect());
    });
  }

  async totalCount(where?) {
    return await this.prisma.judge.count({ where });
  }

  async updateOne(where?, data?): Promise<any> {
    return await this.prisma.judge.update({ where, data });
  }

  async findAll(where?, select?): Promise<any> {
    return await this.prisma.judge.findMany({ where, select });
  }

  async findOne(where?, select?): Promise<any> {
    return await this.prisma.judge.findUnique({ where, select });
  }

  // JUdge Login
  async login(loginDTO: LoginDTO): Promise<any> {
    let email = loginDTO.email;
    let where = { email };
    const judgeData = await this.findOne(where);
    if (!judgeData) {
      throw new Error("User Not found");
    }
    const isPasswordValid = await this.bcrypt.comparePasswords(loginDTO.password, judgeData?.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // const accessToken = this.jwtService.sign({
    //   userId: judgeData.id,
    //   jwtSecretAccess,
    //   expiresIn: "5m",
    //   email: judgeData.email,
    //   firstName: judgeData.firstName,
    //   middleName: judgeData.middleName,
    //   lastName: judgeData.lastName,
    // });
    const token = await this.authService.generateAuthToken(judgeData);
    if (token) return token;
    // return accessToken;
  }

  async deleteOne(id: string): Promise<any> {
    const response = await this.prisma.judge.delete({ where: { id } });
    console.log("????????????????");
    return response;
  }
}
