const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Contact Schema
const OrderSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref:'Cart'
  },
  userId: {
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  total: {
    type: Number,
    default:0
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

const OrderModel= Mongoose.model('Orders', OrderSchema);
module.exports =OrderModel