const mongoose = require("mongoose");
const Customer = require("./customer.model");
const Vehicle = require("./vehicle.model");
const Workshop = require("./workshop.model");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  work: String,
  date: String,
  workshop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workshop",
  },
  isAcknowledged: { type: Boolean, default: false },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
