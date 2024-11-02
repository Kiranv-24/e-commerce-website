const nodemailer = require("nodemailer");
require('dotenv').config();

const sendEmail = async (email, subject, message) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, 
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: subject,
      html: message,
    });

    
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail; 
