import { Injectable } from "@nestjs/common";
import { S3AwsService } from "./s3.aws.service";
import { UtilsService } from "./utils.service";
import { UploadRepository } from "../repository/upload.repository";
import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../repository/user.repository";

const basePath = "https://10-07-2023-s3testing.s3.ap-south-1.amazonaws.com";
const awsS3Bucket = "10-07-2023-s3testing";

enum ImageType {
  CLOSEUP,
  MIDSHOT,
  FULLSIZE,
  NATURALBEAUTY,
}
enum UploadType {
  IMAGE,
  VIDEO,
}

@Injectable()
export class UploadService {
  constructor(
    private s3Service: S3AwsService,
    private utils: UtilsService,
    private repo: UploadRepository,
    private userRepo: UserRepository,
  ) { }

  async uploadOne(userId, upload: any): Promise<any> {
    const user = await this.userRepo.findOne({ id: userId });
    if (user) {
      console.log("first", upload)
      let ID = uuidv4();
      const s3filename = await this.utils.constructFilename(ID, upload?.originalname);
      const payload = {
        id: ID,
        fileName: upload?.originalname,
        fileUrl: `${basePath}/${s3filename}`,
        fileType: upload?.fileType,
        imageType: upload?.imageType,
        userId: user.id,
      };

      const db = await this.repo.createOne(payload);
      if (db) {
        await this.s3Service.uploadS3(awsS3Bucket, s3filename, upload?.buffer);
      }
      return db;
    }
  }

  async download(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const file = await this.repo.findOne({ id })
        const s3filename = await this.utils.constructFilename(file.id, file.fileName);
        const URL = await this.s3Service.presignedUrl(awsS3Bucket, s3filename);
        resolve(URL);
      } catch (error) {
        reject(error)
      }
    })
  }

  // async downloadAllByUserId(id: string) {
  //   // return new Promise((resolve, reject) => {
  //   let include = { uploads: true };
  //   const userData: any = await this.userRepo.findOne({ id }, include);
  //   // console.log("", userData.uploads)

  //   for await (let el of userData.uploads) {
  //     const s3filename = await this.utils.constructFilename(el.id, el.fileName)
  //     console.log("feilname", s3filename);


  //   }

  //   // })
  // }

  async remove(id: string): Promise<any> {
    const file = await this.repo.findOne({ id })
    // if (!file) throw new Error("file not found")
    if (file) {
      const s3filename = await this.utils.constructFilename(file.id, file.fileName)
      const deleteFile = await this.s3Service.removeFileS3(awsS3Bucket, s3filename)
    }
    return;
  }
}

