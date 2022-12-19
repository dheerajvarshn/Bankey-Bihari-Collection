const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Contact Schema
const ReviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref:'Product'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  title: {
    type: String
  },
  rating:{
    type:Number,
    default:0

  },
  reviews:{
    type:Number,
    default:0

  },
  isRecommended: {
    type: Boolean,
    default:false
  },
  status: {
    type: String,
    default: 'Waiting Approval',
    enum: ['Waiting Approval', 'Rejected', 'Approved']
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

const ReviewModel= Mongoose.model('Contact', ReviewSchema);
module.exports =ReviewModel