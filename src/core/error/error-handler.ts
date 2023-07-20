import { HttpException, HttpStatus } from "@nestjs/common";
// import * as fs from "fs";

interface IthrowCustomError {
  message?: string;
  statusCode?: number;
}
export const throwCustomError = (data: IthrowCustomError): Error => {
  throw new Error(JSON.stringify(data));
};

export const handleError = (error) => {
  let customErrorMessage = error;
  try {
    // writeErrorLogToFile(error);
    customErrorMessage = error.response || JSON.parse(error.message);
  } catch (error) {
    console.log("error", error);
  }

  if (customErrorMessage["statusCode"]) {
    throw new HttpException(
      {
        statusCode: customErrorMessage["statusCode"],
        message: customErrorMessage["message"],
        success: false,
      },
      customErrorMessage["statusCode"]
    );
  } else {
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        success: false,
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

// const writeErrorLogToFile = (errorLog: string): void => {
//   const path = require("path");
//   fs.appendFile(__dirname + "error.log", errorLog, (err) => {
//     if (err) throw err;
//   });
// };
