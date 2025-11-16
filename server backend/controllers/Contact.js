import express from "express";
import sendMailer from "../utils/mail.js";



 export const contactus =("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1. Send mail to USER
    await sendMailer(
      email,
      "We received your request",
      `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting us. We will reply soon.</p>
        <p>Your message:</p>
        <p>${message}</p>
      `
    );

    // 2. Send mail to ADMIN / HOST MAIL
    await sendMailer(
      process.env.MAIL_USER,
      "New Contact Request",
      `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    );

    return res.status(200).json({
      success: true,
      message: "Email sent successfully to user and admin",
    });

  } catch (error) {
    console.log("Error in sending mail", error);
    return res.status(500).json({
      success: false,
      message: "Error sending mail",
    });
  }
});


