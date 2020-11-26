require("../lib/connection");

const mongoose = require("mongoose");
const Workshop = require("../models/workshop.model");
const Customer = require("../models/customer.model");
const Record = require("../models/record.model");
const Vehicle = require("../models/vehicle.model");

// Workshop.insertMany([
// {
//   name: "DKK Workshop",
//   owner: "Dave Li",
//   username: "davedabest",
//   email: "dave@dave.com",
//   password: "12345",
//   phone: "6590542367",
//   address: "79, Anson Road",
//   isWorkshop: true
// },
// ]).then((suc) => {
//     console.log("successfully added!");
// }).catch((e) => {
//     console.log(e);
// });

// Customer.insertMany([
//     {
//       firstname: "Ken",
//       lastname: "Wong",
//       username: "KKWONG",
//       email: "ken@ken.com",
//       password: "12345",
//       phone: "6591340359",
//       address: "79, Anson Road",
//       isCustomer: true
//     },
//     ]).then((suc) => {
//         console.log("successfully added!");
//     }).catch((e) => {
//         console.log(e);
//     });

// Vehicle.insertMany([
//     {
//       type: "motorcycle",
//       vehicleNumber: "S98235T",
//       make: "BMW",
//       model: "S1000RR",
//     },
//     ]).then((suc) => {
//         console.log("successfully added!");
//     }).catch((e) => {
//         console.log(e);
//     });

Record.insertMany([
  {
    item: ["motor oil", "brake fluid"],
    price: "200",
    date: Date.now(),
  },
])
  .then((suc) => {
    // console.log("successfully added!");
  })
  .catch((e) => {
    console.log(e);
  });
