import express from "express";
import { UserController } from "@src/controllers/userController";
import { authLimiterMiddleware } from "@src/middlewares/rateLimiter";

const router = express.Router();

router.post("/signup", authLimiterMiddleware, UserController.signup);
router.post("/login", authLimiterMiddleware, UserController.login);
router.post(
  "/forgot-password",
  authLimiterMiddleware,
  UserController.forgotPassword
);
router.post(
  "/reset-password",
  authLimiterMiddleware,
  UserController.resetPassword
);

export default router;
