import { Body, Injectable, } from "@nestjs/common";
import { RegisterTemplate } from "./htmlTemplate/RegistrationTemplate";
import * as nodemailer from "nodemailer";
import { SelectedTemplate } from "./htmlTemplate/SelectedTemplate";
import { RejectedTemplate } from "./htmlTemplate/RejectedTemplate";
import * as AWS from 'aws-sdk';
import * as sesTransport from 'nodemailer-ses-transport';
import { link } from "fs";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";
// import { SendgridService } from './sendGrid.service';

const envFile = process.env.User;
const envPass = process.env.Password;
let htmlTemplates;

@Injectable()
export class EmailService {
  private readonly sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
  private transporter: nodemailer.Transporter;
  private credentials: nodemailer.Transporter<any>

  constructor() {
    this.sqs = new AWS.SQS({ region: 'us-south-1'});
    this.credentials = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: envFile,
        pass: envPass,
      },
    });
  }
  async sendBulkEmails(emails: string[], subject: string, link: string,selectedTemplate: string,name:string): Promise<any> {
    console.log("seleleected ETmplate",selectedTemplate)
    let src = "cid:logo@missaseatic.com"
    try{
      switch (selectedTemplate) {
        case "RegisterTemplate":
          htmlTemplates = RegisterTemplate(name, link);
          break;
        case "SelectedTemplate":
          htmlTemplates = SelectedTemplate(name, link);
          break;
        case "RejectedTemplate":
          htmlTemplates = RejectedTemplate(name, link,src);
          break;
      }
      
    const queueUrl = 'https://sqs.eu-north-1.amazonaws.com/337770721476/MyTestingEmailService.fifo'; // Replace with your SQS queue URL
    console.log("emails", emails);
    const params: AWS.SQS.SendMessageBatchRequest = {
      QueueUrl: queueUrl,
      Entries: emails.map((email, index) => ({
        Id: `email-${index}`,
        MessageBody: JSON.stringify({ email, subject, link ,selectedTemplate}),
        // MessageGroupId: "TestGroup"
      })),
    };
   return await this.sqs.sendMessageBatch(params).promise();
  }
    catch(error){
      console.log("errorororr",error.message)
  }
  }

  async processEmails(): Promise<any> {
    const queueUrl = 'https://sqs.eu-north-1.amazonaws.com/337770721476/MyTestingEmailService.fifo';
    console.log("QUEEE",queueUrl)
    const { Messages } = await this.sqs.receiveMessage({ QueueUrl: queueUrl, MaxNumberOfMessages: 10 }).promise();
    console.log("Message",Messages)
    if (Messages && Messages.length > 0) {
      const deleteParams: AWS.SQS.DeleteMessageBatchRequest = {
        QueueUrl: queueUrl,
        Entries: []
      };
      for (const message of Messages) {
        const { email, subject,link,selectedTemplate } = JSON.parse(message.Body);
        console.log("@@@@@@@@@@@@",email)
        await this.credentials.sendMail({
          from: 'shivanidummy01@gmail.com', 
          to:email,
          subject,
          text:link,
          html:htmlTemplates,
          attachments: [{
            filename: 'logo1.png',
            path: '/home/shivani/Documents/MissaseaticBackend/MissaseaticBackend/src/missaseatic/services/htmlTemplate/logo1.png',
            cid: 'logo@missaseatic.com' 
        }]
        
        });
        deleteParams.Entries.push({ Id: message.MessageId, ReceiptHandle: message.ReceiptHandle });
      }
      await this.sqs.deleteMessageBatch(deleteParams).promise();
    }
  }
}

