import nodemailer, { SendMailOptions } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.EMAIL_ADDRESS;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user,
    pass,
  },
});

export function sendOtp(otp: number, emailTo: string): Promise<string> {
  if (!user || !pass || !otp || !emailTo) {
    throw new Error("All fields are required");
  }

  const mailOptions: SendMailOptions = {
    from: user,
    to: emailTo,
    subject: "Your OTP Verification Code",
    text: `
    Dear User,

    Thank you for choosing our service. Please use the following One-Time Password (OTP) to complete your verification process:

    OTP: ${otp}

    This OTP is valid for the next 10 minutes. Please ensure to enter it promptly. If you did not initiate this request, please ignore this email.

    Best regards,
    The Discussion Board Team
    `,
  };

  // Send the email using a Promise-based approach
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error:", error);
        reject(error); // Reject promise on error
      } else {
        console.log("Email sent: ", info.response);
        resolve("success"); // Resolve promise on success
      }
    });
  });
}
