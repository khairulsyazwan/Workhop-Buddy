const Appointment = require("../models/appointment.model");
const Customer = require("../models/customer.model");
const Record = require("../models/record.model");
const Vehicle = require("../models/vehicle.model");
const router = require("express").Router();
const passport = require("../lib/passportConfig");

// GET customer data
router.get("/:id", async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id).populate({
      path: "appointments vehicles",
      // populate: "workshop vehicle",
    });
    res.status(200).json({ customer });
  } catch (error) {
    res.status(400).json({ message: "no data" });
  }
});

// GET customer appointment data
router.get(
  "/:id/app",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let customer = await Customer.findById(req.params.id).populate({
        path: "appointments vehicles",
        populate: "workshop vehicle",
      });
      res.status(200).json({ customer });
    } catch (error) {
      res.status(400).json({ message: "no data" });
    }
  }
);

// get record data
router.get(
  "/record/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let record = await Record.findById(req.params.id).populate("workshop");
      res.status(200).json({ record });
    } catch (error) {
      res.status(400).json({ message: "no data" });
    }
  }
);

// get appointment data
router.get(
  "/appointment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let appointment = await Appointment.findById(req.params.id).populate(
        "workshop vehicle"
      );
      res.status(200).json({ appointment });
    } catch (error) {
      res.status(400).json({ message: "no data" });
    }
  }
);

// get vehicle data
router.get(
  "/vehicle/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let vehicle = await Vehicle.findById(req.params.id);
      res.status(200).json({ vehicle });
    } catch (error) {
      res.status(400).json({ message: "no data" });
    }
  }
);

// get vehicle data2
router.get(
  "/vehicle/:id/sr",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let vehicle = await Vehicle.findById(req.params.id).populate({
        path: "serviceRecord",
        populate: "workshop",
      });
      res.status(200).json({ vehicle });
    } catch (error) {
      res.status(400).json({ message: "no data" });
    }
  }
);

//POST add new vehicle
router.post(
  "/newvehicle/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let { type, vehicleNumber, make, model } = req.body;

      let vehicle = new Vehicle({ type, vehicleNumber, make, model });
      await vehicle.save();
      let id = req.params.id;
      // console.log(id);
      let c = await Customer.findByIdAndUpdate(id, {
        $push: { vehicles: vehicle },
      });
      // console.log(c);
      res.status(201).json({ message: "new vehicle added!" });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: "one or more fields does not match requirement!" });
    }
  }
);

module.exports = router;
