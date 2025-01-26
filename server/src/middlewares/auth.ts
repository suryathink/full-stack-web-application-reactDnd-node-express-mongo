import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import blacklistTokenData from "../models/blacklist";
import * as dotenv from "dotenv";
dotenv.config();
// Define a type for the decoded user object
interface DecodedToken {
  _id: string;
  email: string;
  name: string;
  // Add any other properties present in your JWT payload
}

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  // Ensure token exists and is properly formatted
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized, token is missing" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    // Check if the token is blacklisted
    const blacklistedToken = await blacklistTokenData.findOne({ token });
    if (blacklistedToken) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized, login again" });
      return;
    }

    // Verify the token
    const decodedInformation = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;

    // Attach decoded user info to the request object
    req.user = decodedInformation;

    next();
  } catch (error) {
    // Handle invalid or expired token
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default verifyToken;
