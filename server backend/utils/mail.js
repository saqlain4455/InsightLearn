import nodemailer from "nodemailer";

const sendMailer = async (email, title, body) => {
  try {
    const crateTransporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,        // smtp.zoho.in
      port: process.env.MAIL_PORT,        // 465
      secure: true,                       // SSL ON
      auth: {
        user: process.env.MAIL_USER,      // your zoho mail
        pass: process.env.MAIL_PASS       // your app password
      },
      pool: true,
      maxConnections: 5,
      rateLimit: 3
    });

    const sender = await crateTransporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body
    });

    return sender;   // THIS IS REQUIRED
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    return null;
  }
};

export default sendMailer;


   
