import { Express } from "express";
import user from "./user";
import task from "./task";
import post from "./post";

export const v1Apis = function (app: Express) {
  app.use("/api/v1/user", user);
  app.use("/api/v1/task", task);
  app.use("/api/v1/post", post);
};
