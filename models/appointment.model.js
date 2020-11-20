const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  work: String,
  date: Date,
});

const Appointment = mongoose.model("Appointment", recordSchema);

module.exports = Appointment;
