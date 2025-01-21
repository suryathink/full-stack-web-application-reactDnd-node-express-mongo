import { Express } from "express";
import { v1Apis } from "./v1";

export const routes = function (app: Express) {
  app.use("/health", (req, res) => {
    res.send("Good Health");
    return;
  });
  v1Apis(app);
};
