import { Module } from '@nestjs/common';
import { EmailController } from '../src/missaseatic/controllers/EmailSQS.controller';
import { EmailService } from '../src/missaseatic/services/email.service';
import { SqsService } from '../src/missaseatic/services/sqs.aws.service'; // Import the AWS config
import AWS from 'aws-sdk';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [EmailService],
})
export class AppModule {
  constructor() {
    AWS.config.update(SqsService); // Update AWS configuration
  }
}