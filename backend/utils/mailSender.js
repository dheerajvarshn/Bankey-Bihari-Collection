const nodemailer = require("nodemailer");
var Mailgen = require("mailgen");
const { user_pass, user_id } = require("../config/key");
const OtpModel = require("../models/Otp");

const transporter = nodemailer.createTransport({
  service : 'gmail',
  auth: {
    user: user_id, // Your email address
    pass: user_pass, // Your email password
  }
});

const generateOtpEmail = (email, otp) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Bankey Bihari Collection",
      link: "http://BankeyBihariCollection.com",
    },
  });

  const emailBody = {
    body: {
      name: "Bankey Bihari Collection",
      intro: "Your OTP for forget password request is:",
      code: otp,
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const setEmail = {
    from: "varshneydheeraj91@gmail.com",
    to: email,
    subject: "Forget Password OTP",
    html: mailGenerator.generate(emailBody),
  };

  return setEmail;
};

const sendOtpEmail = async (email, otp) => {
  const mailOptions = generateOtpEmail(email, otp);
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = sendOtpEmail;

