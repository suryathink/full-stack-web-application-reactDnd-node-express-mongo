import { Express } from "express";
import user from "./user";

export const v1Apis = function (app: Express) {
  app.use("/api/v1/user", user);
};
