import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMailer = async (email, title, body) => {
  try {
    // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,        // smtp.gmail.com
      port: parseInt(process.env.MAIL_PORT), // 465 for SSL
      secure: true,                        // use SSL
      auth: {
        user: process.env.MAIL_USER,       // your Gmail
        pass: process.env.MAIL_PASS        // your Gmail app password
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



   
