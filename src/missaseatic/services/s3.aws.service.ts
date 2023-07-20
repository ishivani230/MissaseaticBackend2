import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, GetObjectCommand, CreateBucketCommand, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";

@Injectable()
export class S3AwsService {
    private s3Client;
    constructor() {
        this.s3Client = new S3Client({
            credentials: {
                accessKeyId: 'AKIAU5JFUGDCBBX5KE43',
                secretAccessKey: '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',
            },
            region: 'ap-south-1',
        })
    }
    // upload file to S3-bucket
    // Bucket = AWS bucket name, Filename is AWS key credentials , body is the file we are trying to upload
    async uploadS3(bucket: string, fileName: string, Body: Buffer) {
        if (!this.s3Client && !bucket) {
            throw new Error('AWS Credentials missing');
        }
        try {
            //PutObjectCommand is used to upload an object (file) to an Amazon S3 bucket. It allows you to specify the bucket name, object key (filename), and the data or file content to be uploaded.
            const command = await new PutObjectCommand({ Bucket: bucket, Key: fileName, Body });
            const s3 = await this.s3Client.send(command);
            return s3;
        }catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // get files s3 from s3
    // Bucket = AWS bucket name, Filename = AWS key credentials 
    async getFileS3(bucket: string, fileName: string) {
        if (!this.s3Client && !bucket) {
            throw new Error('AWS Credentials missing');
        }
        try {
            //GetObjectCommand is used to retrieve an object (file) from an Amazon S3 bucket. It allows you to specify the bucket name and object key (filename) to retrieve the content of the object.
            const command = new GetObjectCommand({ Bucket: bucket, Key: fileName });
            return command;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    //presignedUrl for downloading the file
    // Bucket = AWS bucket name, Filename = AWS key credentials 
    async presignedUrl(bucket: string, fileName: string) {
        if (!this.s3Client && !bucket) {
            throw new Error('AWS Credentials missing');
        }
        try {
            //getFileS3 method takes 2 parameter one bucket name && filnename => in this method GetObjectCommand in called  in which it is used to retrieve an object (file) from an Amazon S3 bucket. It allows you to specify the bucket name and object key (filename) to retrieve the content of the object.
            //getSignedUrl is used to generate a pre-signed URL for accessing an Amazon S3 object or performing operations on it. These URLs can be used to provide secure access to private objects or perform operations to download
            // const command = await new GetObjectCommand({ Bucket: bucket, Key: fileName });
            const command = await this.getFileS3(bucket, fileName);
            return await getSignedUrl(this.s3Client, command, { expiresIn: 10000 }); //10000 min
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    //DeleteObjectCommand for deleting the file from aws
    // Bucket = AWS bucket name, Filename = AWS key credentials 
    async removeFileS3(bucket: string, filename: string) {
        if (!this.s3Client && !bucket) {
            throw new Error('AWS Credentials missing');
        }
        try {
            //To delete an object, create a DeleteObjectCommand object and specify the object to delete
            //to delete multiple objects, you can create a DeleteObjectsCommand object and specify the list of objects to delete
            const command = new DeleteObjectCommand({ Bucket: bucket, Key: filename });
            const s3 = await this.s3Client.send(command);
            return await s3;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    //downloadAll is to get files data and return the reponses 
    // Bucket = AWS bucket name, Filename = AWS key credentials 
    // after sending response to document service, for this document service ( this method is helping us to download files one by one and store into folder and returning the zip folder)
    async downloadAll(bucket: string, fileName: string) {
        if (!this.s3Client && !bucket) {
            throw new Error('AWS Credentials missing');
        }
        try {
            //getFileS3 method takes 2 parameter one bucket name && filnename => in this method GetObjectCommand in called  in which it is used to retrieve an object (file) from an Amazon S3 bucket. It allows you to specify the bucket name and object key (filename) to retrieve the content of the object.
            //this.s3Client sends the bucket name and filename to the s3 and the return is saved in the response variable 
            const command = await this.getFileS3(bucket, fileName);
            const response = await this.s3Client.send(command);
            return await response;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}
