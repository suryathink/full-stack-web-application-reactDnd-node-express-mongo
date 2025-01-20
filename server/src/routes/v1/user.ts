import express from "express";
import { UserController } from "../controller/user.controller";
import verifyToken from "@src/middlewares/auth";
import {
  authLimiterMiddleware,
  apiLimiterMiddleware,
} from "@src/middlewares/rateLimiter";

const router = express.Router();

router.post("/signup", authLimiterMiddleware, UserController.create);
router.post("/login", authLimiterMiddleware, UserController.login);

export default router;
