"use strict";

function getTokenFromRequestHeaders(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    console.log("token not passed");
    res.sendStatus(403);
  }
}

function appRoutes(app) {
  var todoList = require("../controllers/todoListControllers");
  app
    .route("/tasks")
    .get(todoList.list_all_tasks)
    .post(getTokenFromRequestHeaders, todoList.create_a_task);

  app
    .route("/tasks/:taskId")
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
}

module.exports.routes = appRoutes;
