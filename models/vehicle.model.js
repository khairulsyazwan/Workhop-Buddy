const mongoose = require("mongoose");
const { Schema } = mongoose;

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
