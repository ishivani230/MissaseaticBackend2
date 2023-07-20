import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UploadService } from "../services/upload.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("Upload")
export class UploadController {
  // private readonly logger = new Logger(JudgeController.name);
  constructor(
    private service: UploadService,
  ) { }

  // API Path => http://localhost:5001/api/v1/Missaseatic/Upload/file/7599b1a6-1b89-4c7f-8893-c067d6364a2e
  @Post('/file/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param("userId") userId: string, @UploadedFile() file: Express.Multer.File): Promise<any> {
    console.log('File has been uploaded,', userId, file);
    const uploadedFile = await this.service.uploadOne(userId, file);
    return uploadedFile
  }

  // API Path => http://localhost:5001/api/v1/Missaseatic/Upload/download/6cf13783-9510-4f81-bfd9-25f6c0dcbc5d
  @Get('/download/:id')
  async downloadFile(@Param('id') id: string): Promise<any> {
    const Url = await this.service.download(id);
    return Url;
  }

  // API Path => http://localhost:5001/api/v1/Missaseatic/Upload/delete/08b33cf0-5d01-4ade-8d66-0c9eab41ba3a
  @Post('/delete/:id')
  async removeFile(@Param('id') id: string): Promise<any> {
    try {
      await this.service.remove(id);
      return { success: true, status: 200, message: "file delete successfully" };
    } catch (error) {
      console.log(error)
    }
  }

  // @Get('/downloadAll/:id')
  // async downloadAllFile(@Param('id') id: string): Promise<any> {
  //   const file = this.service.downloadAllByUserId(id);
  //   // console.log("first, ", id, file)
  // }
}