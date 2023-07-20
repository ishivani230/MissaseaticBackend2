import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { UserUpdateData } from "../dto/updateuser.dto";
import { BcryptService } from "../services/bcrypt.service";
import { CreateDto } from "../dto/create.dto";
import { AuthService } from "../services/auth.service";
import { LoginDTO } from "../dto/login.dto";

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private bcrypt: BcryptService,
    private authService: AuthService
  ) { }

  async createOne(userDto: CreateDto): Promise<any> {
    console.log("heloooo")
    const hash = await this.bcrypt.hashPassword(userDto?.password);
    // const UserExist = await this.findByEmail(userDto?.email)
    let email = userDto?.email;
    let where = { email }
    console.log("wherere",where)
    const UserExist = await this.findOne({email});
    console.log("Userrrrrrr",UserExist)
    if (UserExist) throw new Error("User already exist");
    return new Promise((resolve, reject) => {
      this.prisma.user.create({
        data: {
          firstName: userDto?.firstName,
          middleName: userDto?.middleName,
          lastName: userDto?.lastName,
          email: userDto?.email,
          password: hash,
          contactNumber: userDto?.contactNumber,
          country: userDto?.country,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          middleName: true,
          lastName: true,
          contactNumber: true,
        },
      })
        .then(user => {resolve({user})})
        .catch((error) => {
          console.log(error, "47");
          reject(error);
        })
        .finally(() => this.prisma.$disconnect());
    });
  }

  async updateOne(id, data): Promise<any> {
    return this.prisma.user.update({
      where:id ,
      data: { ...data }
    });
  }
  


  async updateUnique(id, data): Promise<any> {
    return this.prisma.user.update({
      where:{id} ,
      data: { ...data }
    });
  }
  
  async findAll(where?, select?, take?, skip?): Promise<any> {
    const response = await this.prisma.user.findMany({ where, select, take, skip });
    return response;
  }

  async filterWeightAndHeight(filterdto: any): Promise<any> {
    const response = await this.findAll();
    console.log("findd response",response)
    const filterData = await response?.filter(res => res.weight >= res.height * 11);
    let id, result = [];
    for await (let el of filterData) {
      id = el.id;
      let data = { processingStatus: filterdto?.processingStatus };
      let where = { id };
      let db = await this.updateOne(where, data);
      result.push(db);
    }
    return result;
  }

  async findOne(where?, include?): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.prisma.user.findUnique({ where, include }).then(user => resolve(user)).catch(error => rejects(error)).finally(() => this.prisma.$disconnect());
    })
  }

  // UserLogin
  async login(loginDTO: LoginDTO): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const email = loginDTO?.email;
      let where = { email: email };
      // let select = { id: true, email: true, contactNumber: true, firstName: true, lastName: true, role: true, isActive: true, processingStatus: true }

      let user = await this.findOne(where);
      console.log("user", user)
      if (!user) throw new Error("User Not found");

      const isPasswordValid: boolean = await this.bcrypt.comparePasswords(loginDTO.password, user.password);
      console.log("xdrctfvygbuhnijmk", isPasswordValid)
      if (!isPasswordValid) throw new UnauthorizedException("Invalid password");

      const accessToken = await this.authService.generateAuthToken(user)
      {
        console.log("accessToken",accessToken)
        if (accessToken) resolve(user);
        return accessToken
      }
    })
  }

  async totalCount(where?) {
    return await this.prisma.user.count({ where });
  }

  // async deleteOne(where?): Promise<any> {
  //   const response = await this.prisma.user.delete({ where });
  //   return response;
  // }

}
