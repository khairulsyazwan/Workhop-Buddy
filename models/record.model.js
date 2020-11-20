const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordSchema = new Schema({
  item: [String],
  totalPrice: String,
  date: { type: Date, default: Date.now },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
