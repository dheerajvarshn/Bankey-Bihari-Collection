const express = require("express");
var crypto = require("crypto");
const Razorpay = require("razorpay");
const { payment } = require("../../config/key");

const paymentRoute = express.Router();
const { key_id, key_secret } = payment;

paymentRoute.post("/order", (req, res) => {
  let instance = new Razorpay({ key_id: key_id, key_secret: key_secret });

  var options = {
    amount: req.body.amount * 100, // amount in the smallest currency unit
    currency: "INR",
  };

  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.status(500), send({ message: "Server Error" });
    }
    return res.status(200).send({
      success: true,
      message: "order created",
      data: order
    });
  });
});

paymentRoute.post("/verify", (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(body.toString())
    .digest("hex");
  if (expectedSignature === req.body.response.razorpay_signature) {
    res.status(200).send({
      maessage: "Signature Valid",
    });
  } else {
    return res.send("signature Invalid");
  }
});

module.exports = paymentRoute;
