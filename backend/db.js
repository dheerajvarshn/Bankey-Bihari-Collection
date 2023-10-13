const mongoose = require("mongoose");
const { MONGO_URL, database } = require("./config/key");

mongoose.set({
  strictQuery: false,
});

const connection = mongoose.connect(database).catch((err) => console.log(err));

module.exports = { connection };
