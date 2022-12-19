const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.objectID,
    ref: "USER",
  },
  name: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: Number,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
  },
  State: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  isdefault: {
    type: Boolean,
    default: false,
  },
  updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const AddressModel = mongoose.model("Address", AddressSchema);

module.exports = AddressModel;
