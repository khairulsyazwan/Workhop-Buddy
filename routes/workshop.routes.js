const Appointment = require("../models/appointment.model");
const Customer = require("../models/customer.model");
const Record = require("../models/record.model");
const Vehicle = require("../models/vehicle.model");
const Workshop = require("../models/workshop.model");
const router = require("express").Router();

// GET workshop data
// workshop id

router.get("/:id", async (req, res) => {
  try {
    let workshop = await Workshop.findById(req.params.id).populate(
      "customers appointments"
    );
    res.status(200).json({ workshop });
  } catch (error) {
    res.status(400).json({ message: "no data" });
  }
});

// GET single appointment
// appointment id
router.get("/appointment/:id", async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id).populate(
      "customer vehicle"
    );
    res.status(200).json({ appointment });
  } catch (error) {
    res.status(400).json({ message: "no data" });
  }
});

// PUT single appointment. update acknowledged status
// appointment id
router.put("/appointment/:id", async (req, res) => {
  try {
    let appointment = await Appointment.findByIdAndUpdate(req.params.id, {
      isAcknowledged: true,
    });
    res.status(200).json({ message: "appointment acknowledged!" });
  } catch (error) {
    res.status(400).json({ message: "no data" });
  }
});

// POST update that job is done
// appointment id
router.post("/complete/:id", async (req, res) => {
  try {
    //add new record
    let app = await Appointment.findById(req.params.id).populate(
      "customer vehicle"
    );
    let { item, price, date } = req.body;
    let workshop = app.workshop;
    let record = new Record({ item, price, date, workshop });
    await record.save();

    //push to vehicle service record
    let b = await Vehicle.findByIdAndUpdate(app.vehicle, {
      $push: { serviceRecord: record._id },
    });
    //remove from ws appointment arr and add cust if new
    let ws = await Workshop.findById(workshop);
    let cs = ws.customers;
    let find = cs.indexOf(app.customer._id);

    if (find === -1) {
      let c = await Workshop.findByIdAndUpdate(app.workshop, {
        $pull: { appointments: req.params.id },
        $push: { customers: app.customer },
      });
    } else {
      let c = await Workshop.findByIdAndUpdate(app.workshop, {
        $pull: { appointments: req.params.id },
      });
    }

    // remove from customer appointment arr
    let d = await Customer.findByIdAndUpdate(app.customer, {
      $pull: { appointments: req.params.id },
    });
    delete appointment;
    let appointment = await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "job done!" });
  } catch (error) {
    res.status(400).json({ message: "no data" });
  }
});

module.exports = router;
