import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// sendMailer function
const sendMailer = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT), // 587 recommended for production
      secure: process.env.MAIL_PORT === "465", // true for 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      pool: true,
      maxConnections: 5,
      rateLimit: 3
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body
    });

    console.log("Mail sent:", info.response);
    return info;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return null;
  }
};

export default sendMailer



   
