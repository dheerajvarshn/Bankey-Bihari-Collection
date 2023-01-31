const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// OTP Schema
const OtpSchema = new Schema(
  {
    email: { type: String },
    code: { type: String },
    expireIn: { type: Number },
  },
  {
    timestamps: true,
  }
);

const OtpModel = Mongoose.model("OTP", OtpSchema)
module.exports = OtpModel;
