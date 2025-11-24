import mongoose from "mongoose";
import sendMailer from "../utils/mail.js";

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60
  }
});

const emailVerification = async (email, otp) => {
  try {
    console.log("Sending OTP to:", email);

    const mailResponse = await sendMailer(
      email,
      "verifying the otp here",
      otp
    );

    console.log("Mail verification done: ", mailResponse);
  } catch (error) {
    console.log("Error during email verification:", error);
  }
};

otpSchema.pre("save", async function (next) {
  await emailVerification(this.email, this.otp);
  next();
});

export default mongoose.model("Otp", otpSchema);
