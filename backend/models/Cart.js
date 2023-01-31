// const mongoose=require('mongoose')

const { default: mongoose, Schema } = require("mongoose");

// cartSchema

const CartSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Users" },

  cartItems:{type:Array},
  updated: { type: Date },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
