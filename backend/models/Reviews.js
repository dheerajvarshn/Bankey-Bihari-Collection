const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Contact Schema
const ReviewSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref:'Product'
  },
  userId : {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  title: {
    type: String ,
    require : true
  },
  rating:{
    type:Number,
    default:0 ,
    require : true
  },
  reviews:{
    type : Number ,
    default : 0 ,
    require : true
  },
  desc : {
    type : String 
  }
}, 
{
  timestamps : true
});

const ReviewModel= Mongoose.model('Reviews', ReviewSchema);
module.exports =ReviewModel