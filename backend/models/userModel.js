const { default: mongoose, Schema } = require("mongoose");
const { ROLE_ADMIN, ROLE_MEMBER, ROLE_MERCHANT, } =require ("../constant")

const userSchema = new mongoose.Schema({
 email:{
  type:String
 },
 name:{
  type:String
 },
 phoneNumber:{
  type:Number
 },
 password:{
  type:String
 },
 merchant:{
  type:Schema.Types.ObjectId,
  ref:'Merchant'
 },
 provider: {
  type: String
},
role:{
  type:String,
  default:ROLE_MEMBER,
  enum:[ROLE_MERCHANT,ROLE_ADMIN,ROLE_MEMBER]
},
googleId: {
  type: String
},
facebookId: {
  type: String
},
avatar: {
  type: String
}
});

const Usermodel = mongoose.model("Users", userSchema);

module.exports = Usermodel;
