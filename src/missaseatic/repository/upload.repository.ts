import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UploadRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createOne(data?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.prisma.upload.create({ data })
        .then(file => resolve(file))
        .catch(error => reject(error))
        .finally(() => this.prisma.$disconnect())
    });
  }

  async updateOne(where?, data?): Promise<any> {
    return await this.prisma.upload.update({ where, data });
  }

  async findAll(where?, select?): Promise<any> {
    const response = await this.prisma.upload.findMany({ where, select });
    return response;
  }

  async totalCount(where?) {
    return await this.prisma.upload.count({ where });
  }

  async findOne(where?): Promise<any> {
    return await this.prisma.upload.findUnique({ where });
  }

  async deleteOne(where?): Promise<any> {
    const response = await this.prisma.upload.delete({ where });
    return response;
  }
}
