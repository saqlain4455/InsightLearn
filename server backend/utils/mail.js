import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMailer = async (email, title, body) => {
  try {
    // Create transporter for Gmail
 const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,          // TLS
  secure: false,      // must be false for TLS
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  pool: true,
  maxConnections: 5,
  rateLimit: 3
});

    // Send the email
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body
    });

    console.log("Mail sent:", info.response);
    return info;   // return info is required
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return null;
  }
};

export default sendMailer;



   
