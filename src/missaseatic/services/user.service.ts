import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { UserUpdateData } from "../dto/updateuser.dto";
import { JudgeRepository } from "../repository/judge.repository";
import { UtilsService } from "./utils.service";
import { CreateDto } from "../dto/create.dto";
import { applRelationsPick, applRelations } from "../constants";
import { LoginDTO } from "../dto/login.dto";
import { UserFindAllDto } from "../dto/SearchDatadto";
import { BcryptService } from "./bcrypt.service";

@Injectable()
export class UserService {
  constructor(
    private repo: UserRepository,
    private judgeRepo: JudgeRepository,
    private utils: UtilsService,
    private bcrypt: BcryptService,
  ) { }

  async createUser(userDto: CreateDto): Promise<any> {
    return new Promise((resolve, reject) => this.repo.createOne(userDto).then(user => resolve(user)).catch(error => reject(error)));
  }

  async Userlogin(loginDTO: LoginDTO): Promise<any> {
    return new Promise((resolve, reject) => this.repo.login(loginDTO).then(user => resolve(user)).catch(error => reject(error)));
  }

  async filterData(userDto: any): Promise<any> {
    const result = await this.repo.filterWeightAndHeight(userDto);
    const totalCount = result.length;
    return { totalCount: totalCount, result: result };
  }

  async assignUserToJudge(query, judgeId: string): Promise<any> {
    console.log("service--------------------2", query.take, "judgeId", judgeId);
    //whereQuery
    const filter = this.utils.pick(query, applRelationsPick);
    let defaultWhere = {
      role: { equals: "USER" },
      judgeId: null,
    };
    let where = this.utils.applBuildWhere(filter, applRelations, defaultWhere);
    // let take = query.take ? parseInt(query.take) : null;
    let take = parseInt(query.take) || 0;
    let skip = parseInt(query.skip) || 0;
    // let include = { address: true, judge: true, uploads: true };
    const userData = await this.repo.findAll(where, null, take, skip);
    let userCount: number = await this.repo.totalCount(where);
    console.log("userrrr count",userCount)
    // const judge = await this.judgeRepo.findAll();
    // const judgeCount: number = await this.judgeRepo.totalCount();

    // if(userData.processingStatus !== 'SELECTED') {
    //   throw new Error("User status is ")
    // }

    let userId, user, users = [];
    
    for await (let el of userData) {
      console.log("uc", userCount, "u", "userData", "u.id", el.id)
      userId = el.id;
      user = await this.repo.updateOne({ id: userId }, { judgeId: judgeId });
      users.push(user);
    }
    let updatedUsersCount = users.length
    return { updatedUsersCount, users };

  }

  //find All Data
  async findAll(userDto: UserFindAllDto, query): Promise<any> {
    const filter = this.utils.pick(userDto, applRelationsPick);
    const defaultWhere = { role: { "equals": "USER" } };
    let where = this.utils.applBuildWhere(filter, applRelations, defaultWhere);
    let take = query.take ? parseInt(query.take) : 50;
    let skip = query.skip ? parseInt(query.skip) : 0;
    console.log("first,", where);
    let [totalCount, records] = await Promise.all([this.repo.totalCount(where), this.repo.findAll(where, null, take, skip)])
    return { totalCount, take, skip, records };
  }

  //delete Data
  // async deleteOne(id: string): Promise<any> {
  //   const response = await this.repo.deleteOne(id);
  //   return response;
  // }

  //updateData
  async updateUser(id: string, updateDto: UserUpdateData): Promise<any> {
    const userData = await this.repo.findOne({ id });
    // console.log("findd data by id",userData)
    if (!userData) throw new Error("User not Found");
    let ID = userData.id;
    console.log("iddd", ID)
    // const hash = await this.bcrypt.hashPassword(updateDto?.password);
    if (!updateDto.country || !updateDto.state) throw new Error("Country or State missing");
    const zone = await this.utils.setZone(updateDto.country, updateDto.state)
    // console.log("zone", zone)
    const response = await this.repo.updateUnique(id, {
      // password: hash,
      firstName: updateDto?.firstName,
      middleName: updateDto?.middleName,
      lastName: updateDto?.lastName,
      dateOfBirth: updateDto?.dateOfBirth,
      emergencyContactName: updateDto?.emergencyContactName,
      emergencyContactNumber: updateDto?.emergencyContactNumber,
      educationalQualification: updateDto?.educationalQualification,
      hobbiesTalents: updateDto?.hobbiesTalents,
      height: updateDto?.height,
      weight: updateDto?.weight,
      instagramProfile:updateDto?.instagramProfile,
      bust: updateDto?.bust,
      waist: updateDto?.waist,
      hip: updateDto?.hip,
      describeYourself: updateDto?.describeYourself,
      personalWebsite: updateDto?.personalWebsite,
      title1: updateDto?.title1,
      title2: updateDto?.title2,
      proofOfIdentity: updateDto?.proofOfIdentity,
      indianPassport: updateDto?.indianPassport,
      oci: updateDto?.oci,
      remark1: updateDto?.remark1,
      remark2: updateDto?.remark2,
      remark3: updateDto?.remark3,
      remark4: updateDto?.remark4,
      remark5: updateDto?.remark5,
      isActive: updateDto?.isActive,
      line1: updateDto?.line1,
      line2: updateDto?.line2,
      locality: updateDto?.locality,
      city: updateDto?.city,
      state: updateDto?.state,
      country: updateDto?.country,
      postCode: updateDto?.postCode,
      zone
    });
    return response;
  }

  async findUnique(id: string) {
    const response = await this.repo.findOne({ id }, { address: true, judge: true, uploads: true });
    return response;
  }
}

