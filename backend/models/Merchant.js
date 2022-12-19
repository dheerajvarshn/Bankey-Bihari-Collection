const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Contact Schema
const MerchantSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: Number
  },
  brand:{
    type:String
  },
  business:{
    type:String,
    trim:true
  },
  isActive:{
    type:Boolean,
    default:false
  },
  status:{
    type:String,
    default:'Waiting Approval',
    enum:['Approved','Rejected','Waiting Approval']
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

const MerchantModel= Mongoose.model('Contact', MerchantSchema);
module.exports = MerchantModel