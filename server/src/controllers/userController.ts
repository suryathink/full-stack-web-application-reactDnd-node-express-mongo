import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { logApiError } from "../helpers/errorLogger";

export class UserController {
  public static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      // Validate email format using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).send({
          message: "Invalid email",
        });
        return;
      }

      if (!name || !email || !password) {
        res.status(400).send({
          message: "Name. email and password are required fields",
        });

        return;
      }

      const response = await UserService.signup(name, email, password);
      //   delete response.password;

      if (response && "isError" in response && response.isError) {
        res.status(400).send({
          message: response.message,
        });
        return;
      }

      res.send({ data: response });
    } catch (error) {
      logApiError(req, error as Error);
      res.status(500).send({
        message: "Internal server error",
      });
      return;
    }
  }

  public static async forgotPassword(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { email } = req.body;

      // Validate email format using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).send({
          message: "Invalid email",
        });
        return;
      }

      const response = await UserService.forgotPassword(email);

      if (response && "isError" in response && response.isError) {
        res.status(400).send({
          message: response.message,
        });
        return;
      }

      res.send({ data: response.message });

      return;
    } catch (error) {
      logApiError(req, error as Error);
      res.status(500).send({
        message: "Internal server error",
      });
      return;
    }
  }
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validate email format using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).send({
          message: "Invalid email",
        });
        return;
      }

      if (!email || !password) {
        res.status(400).send({
          message: "email and password are required fields",
        });
      }

      const response = await UserService.login(email, password);

      if (response && "isError" in response && response.isError) {
        res.status(400).send({
          message: response.message,
        });
        return;
      }

      res.send({ data: response });
      return;
    } catch (error) {
      logApiError(req, error as Error);
      res.status(500).send({
        message: "Internal server error",
      });
      return;
    }
  }

  public static async resetPassword(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { email, otp, newPassword } = req.body;

      // Reset password
      const response = await UserService.resetPassword(email, newPassword, otp);

      if (response && "isError" in response && response.isError) {
        res.status(400).send({
          message: response.message,
        });
        return;
      }

      res.send({ data: response.message });
      return;
    } catch (error) {
      logApiError(req, error as Error);
      res.status(500).send({
        message: "Internal server error",
      });
      return;
    }
  }

  public static async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      await UserService.addTokenToBlacklist(token as string);

      res.send({
        message: "Logout Successful",
      });
    } catch (error) {
      logApiError(req, error as Error);
      res.status(500).send({
        message: "Internal server error",
      });
      return;
    }
  }
}
