import { Controller, Logger, Get, Post, Body, Patch, Query, Delete, Param, HttpStatus } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserUpdateData } from "../dto/updateuser.dto";
import { EmailService } from "../services/email.service";
import { CreateDto } from "../dto/create.dto";
import { LoginDTO } from "../dto/login.dto";
import { ResponseControllerDTO } from "../dto/response.controller.dto";

@Controller("User")
export class MerchantController {
  private readonly logger = new Logger(MerchantController.name);
  constructor(
    private emailService: EmailService,
    private service: UserService,
  ) { }

  // API Path => http://localhost:5001/api/v1/Missaseatic/User/sendemail
  // @Post("/sendemail") // need to test
  // async sendUserEmail(
  //   @Body() { email, subject, text, zoomLink, name, selectedTemplate }: any
  // ): Promise<any> {
  //   console.log("emaillll iss", email);
  //   try {
  //     console.log("In try block");
  //     const result = await this.emailService.sendEmail(
  //       email,
  //       subject,
  //       text,
  //       zoomLink,
  //       name,
  //       selectedTemplate
  //     );
  //     console.log("emailtemplate iss", email, subject, text, zoomLink, name);
  //     return { status: 201, message: "Emails sent successfully", data: result };
  //   } catch (error) {
  //     return {
  //       status: 500,
  //       message: "Failed to send emails",
  //       error: error.message,
  //     };
  //   }
  // }

  // API Path => http://localhost:5001/api/v1/Missaseatic/User/create
  @Post("/create") // working
  async create(@Body() userDto: CreateDto): Promise<ResponseControllerDTO> {
    try {
      console.log("Userrrr")
      const data = await this.service.createUser(userDto);
      console.log("userrrrrrrdatattt",data)
      return { success: true, status: 201, message: "User created successfully", data };
    } catch (error) {
      console.log("errroorr", error);
      throw new Error(error.message);
    }
  }

  // API Path => http://localhost:5001/api/v1/Missaseatic/User/login
  @Post("/login") // working
  async login(@Body() loginDto: LoginDTO): Promise<ResponseControllerDTO> {
    try {
      console.log(loginDto, "u-c")
      const data = await this.service.Userlogin(loginDto);
      return { success: true, status: 201, message: "User login successfully", data };
    } catch (error) {
      console.log(error)
    }
  }

  // API Path => http://localhost:5001/api/v1/Missaseatic/User/weight&heightfilter
  @Patch("/weight&heightfilter") // filterWeightAndHeight
  async findAllFilterData(@Query() createDtto: any): Promise<ResponseControllerDTO> {
    try {
      const data = await this.service.filterData(createDtto);
      return { status: 200, message: "filtered data get successfully", data };
    } catch (error) {
      console.log(error)
    }
  }

  // API Path => http://localhost:5001/api/v1/Missaseatic/User/
  @Get('/getUser') // working
  async findAllUsers(@Query() createDtto: any, @Query() query: any): Promise<ResponseControllerDTO> {
    console.log("query", Query)
    const data = await this.service.findAll(createDtto, query);
    return { status: 200, message: "data get successfully", data };
  }

  // API Path => http://localhost:5001/api/v1/Missaseatic/User/1
  // @Delete("/:id") // 
  // async deleteMerchant(@Param("id") id: string): Promise<ResponseControllerDTO> {
  //   const result = await this.service.deleteOne(id);
  //   return { status: 200, message: "data deleted successfully" };
  // }

  // API Path => http://localhost:5001/api/v1/Missaseatic/User/0684c625-4c6f-410b-a1cc-c74009a752cf
  @Get("getOneUser/:id") // working
  async findUser(@Param("id") id: string): Promise<ResponseControllerDTO> {
    const result = await this.service.findUnique(id);
    return {
      status: HttpStatus.FOUND,
      message: "Data get successfully",
      data: result,
    };
  }

  // API Path => http://localhost:5001/api/v1/Missaseatic/User/0684c625-4c6f-410b-a1cc-c74009a752cf
  @Patch('updateUser/:id')
  async updateUserData(@Param('id') id: string, @Body() updateUser: UserUpdateData): Promise<ResponseControllerDTO> {
    try {
      console.log("inside try");
      const data = await this.service.updateUser(id, updateUser);
      console.log("dataaaaa", data);
      return { status: 201, message: "data updated successfully", data };
    } catch (error) {
      console.log("Errrrorr", error.message);
      return { status: 500, message: error.message, data: null };
    }
  }   

  // API Path => http://localhost:5001/api/v1/Missaseatic/User/assign
  @Get('/assign/:judgeId') //working
  async assignUser(@Query() query, @Param('judgeId') judgeId: string): Promise<ResponseControllerDTO> {
    try {
      console.log("assssaa", query)
      const data = this.service.assignUserToJudge(query, judgeId)
      console.log("Userrr iassign",data)
      // console.log("assssaa", data)
      return data;
    } catch (error) {
      console.log(error)
    }
  }


}
