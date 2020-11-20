require("dotenv").config();
const express = require("express");
const server = expres();
const cors = require("cors");
require("./lib/connection");

//Middleware
app.use(express.json());
app.use(cors());

app.use(passport.initialize());

//Routes
app.use("/api/auth", require("./routes/auth.routes"));

app.get("*", (req, res) => {
  res.status(404).json({ message: "Where are you going?" });
});

// Listen
app.listen(process.env.PORT, () =>
  console.log(`running on ${process.env.PORT}`)
);
