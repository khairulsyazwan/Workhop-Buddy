const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(
  process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  (err) => {
    //error condition
    console.log(`mongodb connected!`);
  }
);

module.exports = mongoose;
