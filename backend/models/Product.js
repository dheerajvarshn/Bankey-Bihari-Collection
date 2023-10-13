const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");
const { Schema } = Mongoose;
const slug = require("mongoose-slug-generator");

const options = {
  separator: "-",
  lang: "en",
  truncate: 120,
};
mongoose.plugin(slug, options);

const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
  image: {
    type: String
  },
  description: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  reviews: {
    type: Number,
  },
  category:{
    type:String
  },

  rating: {
    type: Number,
  },
  brand:{
    type:String
  },

  isActive: {
    type: Boolean,
    default: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
});

module.exports = Mongoose.model("Product", ProductSchema);
