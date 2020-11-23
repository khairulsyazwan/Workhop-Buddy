const mongoose = require("mongoose");
const Workshop = require("./workshop.model");
const { Schema } = mongoose;

const recordSchema = new Schema({
  item: [String],
  price: String,
  date: { type: Date, default: Date.now },
  workshop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workshop",
  },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
