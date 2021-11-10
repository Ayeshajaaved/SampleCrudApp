const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const router = require("./src/routes");
//const verifyToken = require("./src/middlewares/auth/verifyToken");

mongoose.connect("mongodb://localhost/Tododb");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);
console.log("Server started on: " + port);

// let listOfTasks = require("./database/db");
// listOfTasks();
