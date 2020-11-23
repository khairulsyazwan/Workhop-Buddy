const Appointment = require("../models/appointment.model");
const Customer = require("../models/customer.model");
const Record = require("../models/record.model");
const Vehicle = require("../models/vehicle.model");
const Workshop = require("../models/workshop.model");
const router = require("express").Router();

//POST add new appointment
router.post("/new/:id", async (req, res) => {
  try {
    let { vehicle, work, date, workshop } = req.body;
    let customer = req.params.id;
    // console.log(workshop);
    let appointment = new Appointment({
      customer,
      vehicle,
      work,
      date,
      workshop,
    });
    await appointment.save();

    // console.log(appointment);
    let c = await Workshop.findByIdAndUpdate(workshop, {
      $push: { appointments: appointment._id },
    });
    let d = await Customer.findByIdAndUpdate(customer, {
      $push: { appointments: appointment._id },
    });
    // console.log(c);
    res.status(201).json({ message: "new appointment added!" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "one or more fields does not match requirement!" });
  }
});

module.exports = router;
