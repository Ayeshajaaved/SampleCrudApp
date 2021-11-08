const jwt = require("jsonwebtoken");
const { loginValidationSchema } = require("../helpers/login_validation");

var mongoose = require("mongoose"),
  Task = mongoose.model("Tasks");

exports.list_all_tasks = function (req, res) {
  Task.find({}, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

// A token is required to create a new task
exports.create_a_task = function (req, res) {
  let tokenAuthorized = false;

  jwt.verify(req.token, "secretKey", (err) => {
    if (err) {
      res.status(403).send("Invalid token.");
    } else {
      tokenAuthorized = true;
    }
  });

  //console.log("tokenAuthorized", tokenAuthorized);

  if (tokenAuthorized) {
    const validationResult = loginValidationSchema.validate(req.body);

    //console.log("validationResult", validationResult);

    if (validationResult.error) {
      res
        .status(422)
        .send(
          "Invalid data - Validation failed. \nMessage: " +
            validationResult.error
        );
    } else {
      var new_task = new Task(req.body);
      new_task.save(function (err, task) {
        if (err) res.send(err);
        res.json(task);
      });
    }
  }
};

exports.read_a_task = function (req, res) {
  Task.findById(req.params.taskId, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function (req, res) {
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    function (err, task) {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

exports.delete_a_task = function (req, res) {
  Task.remove(
    {
      _id: req.params.taskId,
    },
    function (err) {
      if (err) res.send(err);
      res.json({ message: "Task successfully deleted" });
    }
  );
};
