const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const Appointment = require("./appointment.model");
const Customer = require("./customer.model");

const workshopSchema = new Schema({
  name: String,
  owner: String,
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: Number,
  address: String,
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  ],
  isWorkshop: { type: Boolean, default: true },
  //will need to push to vehicle schema, then to customer
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

workshopSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();

  var hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;
  next();
});

workshopSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
