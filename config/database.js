const mongoose = require("mongoose");


exports.connect = mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("DB Connected!!"))
