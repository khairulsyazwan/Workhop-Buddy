const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    //error condition
    // console.log(`mongodb connected to ${process.env.DB}!`);
  }
);

module.exports = mongoose;
