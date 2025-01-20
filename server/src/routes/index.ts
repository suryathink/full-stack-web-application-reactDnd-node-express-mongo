import { Express, Request, Response } from "express";
import { v1Apis } from "./v1";

// Health Check Route
const healthCheck = (_req: Request, res: Response): void => {
  res.send("Server's health is good");
  return;
};

// Register routes with the Express app
export const routes = (app: Express): void => {
  // Health Check endpoint
  app.get("/health", healthCheck);

  // Version 1 API routes
  v1Apis(app);
};
