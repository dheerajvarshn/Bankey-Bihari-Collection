const { Router } = require("express");
const OtpModel = require("../../models/Otp");
const bcrypt = require("bcrypt");
const Usermodel = require("../../Models/userModel");
const sendOtpEmail = require("../../utils/mailSender");

const forgetPasswordRouter = Router();

// email send router
forgetPasswordRouter.post("/forget-password", async (req, res) => {
  try {
    const { email } = req.body;

    Usermodel.findOne({ email }).exec((err, data) => {
      if (err) {
        return res
          .status(404)
          .json({ error: "No user found for this email address" });
      }
      if (data) {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const currentTime = Date.now();

        const otpData = new OtpModel({
          email: email,
          code: otp,
        });

        otpData.save((err, data) => {
          if (err) {
            return res.status(400).send({ error: err });
          } else {
            const { email, code } = data;
            sendOtpEmail(email, code);
            return res.status(200).send({
              status: "success",
              desc: "please cheack your email id",
              content: data,
            });
          }
        });
      } 
      // else {
      //   res.status(400).send({
      //     desc: "Account not exit sorry!",
      //     status: "fail",
      //   });
      // }
    });
  } catch (err) {
    return res.status(400).send({
      message: "your request cannot be processes,please try again !",
      error: err,
    });
  }
});

// change password router
forgetPasswordRouter.post("/reset-password", async (req, res) => {
  let { code, email, password } = req.body;
  const currentTime = Date.now();
  try {
    const data = await OtpModel.findOne({ email, code });

    if (!data) {
      res.status(400).send({ message: "Otp is incorrect", status: "403" });
    }

    const timestamp = data.createdAt;

    if (data.code === code && currentTime - timestamp <= 2 * 60 * 1000) {

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      password=hash ;
      Usermodel.findOneAndUpdate({ email }, { password: password }).exec(
        (err, data) => {
          if (err) {
            return res.status(400).send({
              status: 403,
              message: "something went wrong,try again later",
            });
          }
          OtpModel.deleteMany({})
            .then(() => console.log("delete succcefully"))
            .catch((err) => {
              console.log(err);
            });
          return res.status(200).send({
            status: 200,
            message: "your password has been changed successfully",
            data: data,
          });
        }
      );
    } else {
      return res.send({
        status: 403,
        message: "OTP is expire ! please try again",
      });
    }
  } catch (err) {
    return res.status(400).send({
      status: false,
      message: "your request cannot be process,please try again later",
      error: err,
    });
  }
});

module.exports = forgetPasswordRouter;
