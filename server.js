var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Tododb");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var todoListRoutes = require("./api/routes/todoListRoutes");
app.use("/tasks", todoListRoutes);

const loginRoutes = require("./api/routes/loginRoutes");
app.use("/api/login", loginRoutes);

app.listen(port);
console.log("Server started on: " + port);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

let listOfTasks = require("./database/db");
listOfTasks();
