const { Router } = require("express");
const OtpModel = require("../../models/Otp");
const Usermodel = require("../../Models/userModel");

const nodemailer = require("nodemailer");

const forgetPasswordRouter = Router();

// email send router
forgetPasswordRouter.post("/send_email", async (req, res) => {
  try {
    const { email } = req.body;
     Usermodel.findOne({ email }).exec((err,data)=>{
      if(err){
        return res
        .status(404)
        .json({ error: "No user found for this email address" });
      }
      if(data){
        const otpcode = Math.floor((Math.random() * 10000)+ 1);
        const otpData = new OtpModel({
          email: email,
          code: otpcode,
          expireIn: new Date().getTime() + 300 * 1000,
        });
        otpData.save((err, data) => {
          if (err) {
            return res.status(400).send({ error: err });
          }
          return res.status(200).send({
            status: "success",
            message: "please cheack your email id",
            content: data,
          })
        });
      }
     })
  } catch (err) {
    return res.status(400).send({
      message: "your request cannot be processes,please try again !",
      error: err,
    });
  }
});

// change password router
forgetPasswordRouter.post("/change_password", async (req, res) => {
  const { code, email, password } = req.body;
  try {
    const data = await OtpModel.findOne({ email, code });
    if (!data) {
      res.status(400).send({ message: "Otp is incorrect", status: "error" });
    }

    const diff = data.expireIn - new Date().getTime();
    if (diff < 0) {
      return res.status(400).send({
        message: "OTP is expire",
      });
    } else {
      Usermodel.findOneAndUpdate({ email }, { password: password }).exec(
        (err, data) => {
          if (err) {
            return res
              .status(400)
              .send({ message: "something went wrong,try again later" });
          }

          return res.status(200).send({
            status: true,
            message: data,
          });
        }
      );
    }
  } catch (err) {
    return res.status(400).send({
      status: false,
      message:'your request cannot be process,please try again later',
      error:err
    });
  }
});

const mailer = (otp, email) => {
  console.log(otp, email);

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "varshneyd905@gmail.com",
      pass: "dheeraj@123",
    },
  });

  let mailDetails = {
    from: "varshneyd905@gmail.com",
    to: email,
    subject: "Test mail",
    text: `your one time OTP is ${otp}`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
};

module.exports = forgetPasswordRouter;
