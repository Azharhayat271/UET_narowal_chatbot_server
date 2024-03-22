// otpService.js

// Import necessary libraries
const nodemailer = require("nodemailer");

// Global variable to store the OTP
let globalOTP;

// Function to generate a random 6-digit OTP
const generateOTP = () => {
  globalOTP = Math.floor(100000 + Math.random() * 900000).toString();
  return globalOTP;
};

// Function to send OTP via email
const sendOTPEmail = async (email) => {
  try {
    if (!globalOTP) {
      throw new Error('OTP not generated.');
    }

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "azharhayat271@gmail.com", // Replace with your Gmail email
        pass: "dorb qmnw dvml fhol", // Replace with your Gmail app password
      },
    });

    // Email message
    const mailOptions = {
      from: "Azharhayat271@gmail.com", // Sender email address
      to: email, // Recipient email address
      subject: "OTP UET Narowal Assistant Chatbot", // Email subject
      text: `Your OTP for UET Narowal Assistant Chatbot is : ${globalOTP}. Do not share this with any one.`, // Email body
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP via email:", error);
    throw new Error("Failed to send OTP");
  }
};

// Function to verify OTP
const verifyOTP = (otp) => {
  return otp === globalOTP;
};

module.exports = {
  generateOTP,
  sendOTPEmail,
  verifyOTP,
};
