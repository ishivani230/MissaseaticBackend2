import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { MerchantController } from "./controllers/user.controller";
import { UserRepository } from "./repository/user.repository";

import { UtilsService } from "./services/utils.service";
import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";
import { BcryptService } from "./services/bcrypt.service";
import { JudgeService } from "./services/judge.services";
import { UserService } from "./services/user.service";
import { JudgeRepository } from "./repository/judge.repository";
import { JudgeController } from "./controllers/judge.controller";
import { EmailService } from "./services/email.service";

import { UploadController } from "./controllers/upload.controller";
import { UploadService } from "./services/upload.service";
import { UploadRepository } from "./repository/upload.repository";
import { S3AwsService } from "./services/s3.aws.service";
import { AuthService } from "./services/auth.service";
import { EmailController } from "./controllers/EmailSQS.controller";
import { SqsService } from "./services/sqs.aws.service";
//import { EmailController } from "./controllers/EmailSQS.controller";

export const jwtSecret = "zjP9h6ZI5LoSKCRj";

@Module({
  imports: [
    PrismaModule,
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        auth: {
          user: "shivanidummy01@gmail.com",
        },
      },
      template: {
        dir: join(__dirname, "./template"),
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),

    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: "5m" },
    }),
  ],

  controllers: [ MerchantController, JudgeController, UploadController, EmailController ],
  providers: [ UserService, UserRepository, UtilsService, BcryptService, JudgeRepository, JudgeService, EmailService, AuthService, UploadService, UploadRepository, S3AwsService, EmailService,
  ],
})
export class UserModule {}
