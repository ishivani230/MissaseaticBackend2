import { JudgeRepository } from "../repository/judge.repository";
import { JudgeDataDto } from "../dto/judge.dto";
import { LoginDTO } from "../dto/login.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JudgeService {
  constructor(private repo: JudgeRepository) { }

  async create(judgedto: JudgeDataDto): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.repo.createOne(judgedto)
        .then((ar) => resolve(ar))
        .catch((error) => reject(error));
    });
  }

  async loginJudge(loginDTO: LoginDTO): Promise<any> {
    const response = await this.repo.login(loginDTO)
    return response;

  }

  async findJudge(id: string): Promise<any> {
    const response = await this.repo.findOne({id});
    return response;
  }

  async updateJudge(id: string, updatedto: any): Promise<any> {
    const user = await this.repo.findOne({id});
    console.log("find By id Judge",user)
    //judge will update user remarks
    if(!user)
    throw new Error("User not found");
    const response = await this.repo.updateOne(user.id, updatedto);
    return response;
  }

  async findJudges(): Promise<any> {
    let [totalCount, records] = await Promise.all([this.repo.totalCount(), this.repo.findAll()])
    return { totalCount, records };
  }

  // async deleteOne(id: string): Promise<any> {
  //   console.log("deleteeeeeeeee");
  //   const response = await this.repo.deleteOne({id});
  //   return response;
  // }
}
