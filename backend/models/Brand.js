const mongoose = require("mongoose");
const slug=require('mongoose-slug-generator')

const options = {
    separator: '-',
    lang: 'en',
    truncate: 120
  };
mongoose.plugin(slug,options)

const BrandSchema = new mongoose.Schema({

  name:{
    type: String,
    trim:true
  },
  slug:{
    type:String,
    slug:'name',
    unique:true
  },
  discription:{
    type:String,
    trim:true,
  },
  image:{
    type:String,
    data:Buffer
  },
  isactive:{
    type:Boolean,
    default:true
  },
  merchant: {
    type: Schema.Types.objectID,
    ref: "Merchant",
    default:null
  },
  updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const BrandModel = mongoose.model("Address", BrandSchema);

module.exports = BrandModel;