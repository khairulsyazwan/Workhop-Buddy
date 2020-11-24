const mongoose = require("mongoose");
const { Schema } = mongoose;
const Appointment = require("../models/appointment.model");
const Customer = require("../models/customer.model");
const Vehicle = require("../models/vehicle.model");
const Workshop = require("../models/workshop.model");

const recordSchema = new Schema({
  item: [{ item: String, qty: Number, price: Number }],
  price: String,
  date: String,
  workshop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workshop",
  },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
