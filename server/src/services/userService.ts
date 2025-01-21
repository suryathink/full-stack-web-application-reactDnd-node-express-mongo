import bcrypt from "bcryptjs";
import nodemailer, { SentMessageInfo } from "nodemailer";
import log4js from "log4js";
import { OTPService } from "./otpService";
import User, { IUser } from "../models/user";
import { generateToken } from "../helpers/jwthelper";

const logger = log4js.getLogger();

export class UserService {
  public static async signup(name: string, email: string, password: string) {
    const alreadyExisting = await User.findOne({
      email,
    });

    if (alreadyExisting) {
      return {
        isError: true,
        message: "User already exists with this email",
      };
    }
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password),
    });
    const { password: _, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  public static async login(email: string, password: string) {
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return {
        isError: true,
        message: "Invalid email or password",
      };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return {
        isError: true,
        message: "Invalid email or password",
      };
    }

    // Generate the token without the password
    const { password: _, ...userWithoutPassword } = user;

    return {
      token: generateToken(userWithoutPassword as Partial<IUser>),
      user: userWithoutPassword,
    };
  }

  public static async forgotPassword(email: string) {
    // Check if the email exists in the database
    const user = await User.findOne({ email }).lean();
    if (!user) {
      console.log("User with this email does not exist");
      return {
        isError: true,
        message: "User with this email does not exist",
      };
    }

    // Generate and store OTP
    const otp = await OTPService.generateAndStoreOTP(email);

    // Send the OTP to the user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "singhsuryaprakash110@gmail.com",
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const mailOptions = {
      from: "singhsuryaprakash110@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(
      mailOptions,
      (error: Error | null, info: SentMessageInfo) => {
        if (error) {
          logger.error("Error sending email:", error);
          return {
            isError: true,
            message: "Failed to send OTP via email",
          };
        }

        logger.log("Email sent:", info.response);
      }
    );

    return {
      isError: false,
      message: "OTP sent successfully",
    };
  }

  public static async resetPassword(
    email: string,
    newPassword: string,
    enteredOTP: string
  ) {
    // Check if user exists
    const user = await User.findOne({ email }).lean();
    if (!user) {
      logger.log("User with this email does not exist");
      return {
        isError: true,
        message: "User with this email does not exist",
      };
    }

    // Verify OTP
    const isOTPValid = await OTPService.verifyOTP(email, enteredOTP); // Assuming OTPService has a verifyOTP method
    if (!isOTPValid) {
      return {
        isError: true,
        message: "Invalid or expired OTP",
      };
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword);

    // Update the user's password in the database
    await User.updateOne({ email }, { password: hashedPassword });

    return {
      isError: false,
      message: "Password reset successfully",
    };
  }
}
