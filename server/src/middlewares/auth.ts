import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Define a type for the decoded user object if needed (adjust this type based on your token payload)
interface DecodedToken {
  userId: string;
  email: string;
  // Add any other properties that are present in your JWT payload
}

const verifyToken =
  () =>
  (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const decodedInformation = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodedToken;
      req.user = decodedInformation; // Attach the decoded user information to the request object
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
  };

export default verifyToken;
