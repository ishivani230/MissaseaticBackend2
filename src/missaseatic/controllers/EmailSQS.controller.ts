import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from '../services/email.service';

@Controller('Email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  // API Path => http://localhost:5001/api/v1/Missaseatic/Email/send
  @Post('/send')
  async sendBulkEmails(@Body('emails') emails: string[], @Body('subject') subject: string, @Body('link') link: string, @Body('selectedTemplate') selectedTemplate:string, @Body('name') name: string) {
    await this.emailService.sendBulkEmails(emails, subject, link,selectedTemplate,name);
  }



}