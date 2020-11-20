const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const Vehicle = require("./vehicle.model");
const Appointment = require("./appointment.model");

const customerSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: Number,
  address: String,
  vehicles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  ],
  isCustomer: { type: Boolean, default: true },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

customerSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();

  var hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;
  next();
});

customerSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
