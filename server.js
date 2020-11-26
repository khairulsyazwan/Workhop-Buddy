require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
require("./lib/connection");
const passport = require("passport");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

//deployment

server.use(express.static(path.join(__dirname, "front/build")));

//Middleware
server.use(express.json());
server.use(cors());
server.use(bodyparser.urlencoded({ extended: false }));
server.use(bodyparser.json());
server.use(cookieParser());
server.use(passport.initialize());

//Routes
server.use("/api/auth", require("./routes/auth.routes"));
server.use("/api/customer", require("./routes/customer.routes"));
server.use("/api/workshop", require("./routes/workshop.routes"));
server.use("/api/appointment", require("./routes/appointment.routes"));

// server.get("/", function (req, res) {
//   res.status(200).send(`Welcome to login , sign-up workshopbuddy`);
// });
// server.get("*", (req, res) => {
//   res.status(404).json({ message: "This is not where you belong." });
// });

//deployment
server.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "front/build", "index.html"));
});

// Listen
server.listen(process.env.PORT, () =>
  // console.log(`running on ${process.env.PORT}`)
);
