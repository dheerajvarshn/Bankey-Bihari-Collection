const { default: mongoose, Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
  userName:{
   type:String   
  },
 email:{
  type:String,
  unique:true
 },
 phoneNumber:{
  type:Number
 },
 password:{
  type:String
 }
 
});

const Usermodel = mongoose.model("Users", userSchema);

module.exports = Usermodel;
