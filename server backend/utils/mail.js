import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMailer = async (email, title, body) => {
  try {
    const msg = {
      to: email,
      from: process.env.MAIL_USER,   // verified gmail you added
      subject: title,
      html: body,
    };

    const response = await sgMail.send(msg);
    console.log("Mail sent:", response[0].statusCode);
    return response;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return null;
  }
};

export default sendMailer;




   
