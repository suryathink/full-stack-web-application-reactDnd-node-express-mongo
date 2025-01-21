import OTPModel from "../models/otpModel";

export class OTPService {
  public static async generateAndStoreOTP(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Store the OTP in the database, associating it with the user
    await OTPModel.create({
      email,
      otp,
      createdAt: new Date(),
    });

    return otp;
  }
  public static async verifyOTP(email: string, enteredOTP: string) {
    const OTP_EXPIRY_DURATION = 10 * 60 * 1000;
    // Retrieve the stored OTP for the email from the database
    const otpRecord = await OTPModel.findOne({ email })
      .sort({ createdAt: -1 }) // Get the most recent OTP
      .lean();

    // Check if OTP is valid and not expired
    if (
      otpRecord &&
      otpRecord.createdAt > new Date(Date.now() - OTP_EXPIRY_DURATION)
    ) {
      //  delete the OTP record from the database after successful verification
      await OTPModel.deleteOne({ otp: otpRecord.otp });
      return true;
    } else {
      return false;
    }
  }
}
