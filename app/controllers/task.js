const TaskModel = require("../models/task");

exports.list_all_tasks = function (req, res) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;

  TaskModel.find({})
    .skip(startIndex)
    .limit(limit)
    .exec((err, tasks) => {
      if (err) {
        res.status(500);
      } else {
        res.status(200).json({
          tasks: tasks,
        });
      }
    });
};

exports.create_a_task = (req, res) => {
  const new_task = new TaskModel({
    name: req.body.name,
    author: req.body.author,
  });

  new_task.save(function (err, task) {
    if (err) {
      console.log("error ", err);
      res.send(err);
    } else {
      console.log("elseee");
      res.json(task);
    }
  });
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
