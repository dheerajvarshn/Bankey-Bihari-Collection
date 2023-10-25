const mongoose = require("mongoose");
const { database } = require("./config/key");

mongoose.set({
  strictQuery: false,
});

const connection = mongoose.connect(database,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>console.log('connection successfull')).catch((err) => console.log(err))

module.exports = { connection };
