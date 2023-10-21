const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Contact Schema
const ReviewSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref:'Product',
    require:true
  },
  userId : {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  userName:{
    type:String,
    require:true
  },
  reviewText: {
    type: String ,
    require : true
  },
  rating:{
    type:Number,
    default:0 ,
    require : true
  }
},
{
  timestamps : true
});

const ReviewModel= Mongoose.model('Reviews', ReviewSchema);
module.exports =ReviewModel