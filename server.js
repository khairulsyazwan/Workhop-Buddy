require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
require("./lib/connection");
const passport = require("passport");

//Middleware
server.use(express.json());
server.use(cors());

server.use(passport.initialize());

//Routes
server.use("/api/auth", require("./routes/auth.routes"));
server.use("/api/customer", require("./routes/customer.routes"));
server.use("/api/workshop", require("./routes/workshop.routes"));
server.use("/api/appointment", require("./routes/appointment.routes"));

server.get("*", (req, res) => {
  res.status(404).json({ message: "This is not where you belong." });
});

// Listen
server.listen(process.env.PORT, () =>
  console.log(`running on ${process.env.PORT}`)
);
