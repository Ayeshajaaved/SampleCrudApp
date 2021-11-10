const { loginValidationSchema } = require("../../app/helpers/login_validation");
const TaskModel = require("../models/task");

exports.list_all_tasks = function (req, res) {
  TaskModel.find({}, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json(res.paginatedRecords);
    }
  });
};

// A token is required to create a new task
exports.create_a_task = function (req, res) {
  const validationResult = loginValidationSchema.validate(req.body);

  if (validationResult.error) {
    res
      .status(422)
      .send(
        "Invalid data - Validation failed. \nMessage: " + validationResult.error
      );
  } else {
    var new_task = new TaskModel(req.body);
    new_task.save(function (err, task) {
      if (err) {
        res.send(err);
      } else {
        res.json(task);
      }
    });
  }
};

exports.read_a_task = function (req, res) {
  TaskModel.findById(req.params.taskId, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function (req, res) {
  TaskModel.findOneAndUpdate(
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
  TaskModel.remove(
    {
      _id: req.params.taskId,
    },
    function (err) {
      if (err) res.send(err);
      res.json({ message: "Task successfully deleted" });
    }
  );
};
