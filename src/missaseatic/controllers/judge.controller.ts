import { Controller, Get, Post, Body, Param, Delete, Patch } from "@nestjs/common";
import { JudgeService } from "../services/judge.services";
import { JudgeDataDto } from "../dto/judge.dto";
import { LoginDTO } from "../dto/login.dto";
import { ResponseControllerDTO } from "../dto/response.controller.dto";

@Controller("Judge")
export class JudgeController {
  // private readonly logger = new Logger(JudgeController.name);
  constructor(
    private service: JudgeService,
  ) {}

  // API Path => http://localhost:5001/api/v1/Missaseatic/Judge/create
  @Post("/create")
  // @UsePipes(new ValidationPipe())
  async createAllJudge(@Body() judgedata: JudgeDataDto): Promise<ResponseControllerDTO> {
    try {
      const result = await this.service.create(judgedata);
      return { success: true, status: 201, message: "User created successfully",data:result };
    } catch (error) {
      // const {message,status} = JSON.parse(error.message)
      // throw new HttpException("Server Error", HttpStatus.BAD_REQUEST)
      console.log("errroorr", error.message);
    }
  }

  // API Path => http://localhost:5001/api/v1/Missaseatic/Judge/login
  @Post('/login')
  async judgelogin(@Body() loginDTO: LoginDTO): Promise<ResponseControllerDTO> {
    const result = await this.service.loginJudge(loginDTO)
    console.log("resulttt",result)
    return { success: true, status: 201, message: "Judge login successfully", data: result }
  }

  // API Path => http://localhost:5001/api/v1/Missaseatic/Judge/1
  @Patch('updateJudge/:id')
  async updateJudge(@Param('id') id: string, @Body() updateJudge: any): Promise<ResponseControllerDTO> {
    try {
      const result = await this.service.updateJudge(id, updateJudge)
      return { success: true, status: 200, message: "Data updated successfully", data: result }
    }
    catch (error) {
      console.log("Errrrorr", error.message)
    }
  }

  // API Path => http://localhost:5001/api/v1/Missaseatic/Judge
  @Get('/getAllJudge')
  async findAllJudge(): Promise<ResponseControllerDTO> {
    const result = await this.service.findJudges();
    return { success: true, status: 200, data: result };
  }

  // API Path => http://localhost:5001/api/v1/Missaseatic/Judge/1
  // @Delete('/:id')
  // async deleteJudge(@Param("id") id: string): Promise<any> {
  //   console.log("Inside the block");
  //   const result = await this.service.deleteOne(id);
  //   return { success: true,status: 200, message: "data deleted successfully" };
  // }
}
