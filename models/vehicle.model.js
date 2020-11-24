const mongoose = require("mongoose");
const { Schema } = mongoose;
const Appointment = require("../models/appointment.model");
const Customer = require("../models/customer.model");
const Record = require("../models/record.model");
const Workshop = require("../models/workshop.model");

const vehicleSchema = new Schema({
  type: String,
  vehicleNumber: String,
  make: String,
  model: String,
  serviceRecord: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Record",
    },
  ],
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
