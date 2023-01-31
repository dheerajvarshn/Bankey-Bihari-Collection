const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Contact Schema
const ContactSchema = new Schema({
  number:{
    type:Number
  },
  email: {
    type: String
  },
  message: {
    type: String,
    trim: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports= Mongoose.model('Contact', ContactSchema);
 