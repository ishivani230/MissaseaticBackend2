import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./missaseatic/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PrismaModule,
    MailerModule,
    // AuthService,
  ],
})
export class AppModule {}
