import * as  jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { Injectable } from "@nestjs/common";

const envSecret = process.env.jwtSecretAccess;


@Injectable()
export class AuthService {
  async generateAuthToken(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload = {
        userId: user?.id,
        email: user?.email,
      };
      const token = jwt.sign(payload, envSecret, { expiresIn: '1h' });
      resolve(token)
    })
  }

  verifyAuthToken(token: string): User | null {
    try {
      const decodedToken: any = jwt.verify(token, envSecret);
      const { userId, email } = decodedToken;
      return { id: userId, email } as User;
    } catch (error) {
      return null;
    }
  }
}