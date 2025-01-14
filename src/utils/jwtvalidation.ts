import jwt from "jsonwebtoken";
import { userinfoPayload } from "../types/types";

// Asynchronous function to sign the token
export async function signTokenAsync(payload: {
  userInformation: userinfoPayload;
}): Promise<string> {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
  const options = { expiresIn: "1h" };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token as string);
    });
  });
}

// Asynchronous function to verify the token
export async function verifyTokenAsync(token: string): Promise<any> {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET as string;

  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}
