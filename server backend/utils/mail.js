import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMailer = async (email, title, body) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return null;
  }
};

export default sendMailer;



   
