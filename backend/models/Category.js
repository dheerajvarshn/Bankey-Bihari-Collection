const mongoose = require("mongoose");

const slug=require('mongoose-slug-generator')

const options = {
    separator: '-',
    lang: 'en',
    truncate: 120
  };
mongoose.plugin(slug,options)

const CategorySchema = new mongoose.Schema({

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
  product: {
    type: Schema.Types.objectID,
    ref: "Product",
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

const CategoryModel = mongoose.model("Address", CategorySchema);

module.exports = CategoryModel