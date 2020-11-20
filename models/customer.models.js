const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

//presave for hashing password
customerSchema.pre("save", function (next) {
    var customer = this;
    if (!customer.isModified("password")) return next();
  
    var hash = bcrypt.hashSync(customer.password, 10);
  
    customer.password = hash;
    next();
  });