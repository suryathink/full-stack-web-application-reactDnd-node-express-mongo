// otpModel.js

import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // This will automatically delete the document after 10 minutes
  },
});

const OTPModel = mongoose.model("OTP", otpSchema);

export default OTPModel;
