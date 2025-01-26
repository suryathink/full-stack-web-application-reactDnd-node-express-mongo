import jwt from "jsonwebtoken";
import { IUser } from "../models/user";
import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(user: Partial<IUser>) {
  let payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };
  return jwt.sign(payload, JWT_SECRET);
}

export function verifyToken(token: string) {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
}
