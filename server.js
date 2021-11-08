var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  Task = require("./api/models/todoListModels");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Tododb");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var { routes } = require("./api/routes/todoListRoutes");
routes(app); // register the route

const loginRoutes = require("./api/routes/loginRoutes");
app.use("/api/login", loginRoutes);

app.listen(port);
console.log("todo list RESTful API server started on: " + port);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
