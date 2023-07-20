import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1/Missaseatic");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("")
    .setDescription("")
    .setVersion("v1")
    .addTag("")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/v1/Missaseatic/entities/doc", app, document);
  await app.listen(process.env.SERVICE_PORT);
  console.log("server Created successfully",process.env.SERVICE_PORT)
}


bootstrap();
