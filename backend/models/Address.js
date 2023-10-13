const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },

  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: { type: String },
  pincode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  locality: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Address", AddressSchema);
