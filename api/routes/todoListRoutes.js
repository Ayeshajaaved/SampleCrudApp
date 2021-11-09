"use strict";
var express = require("express");
const router = express.Router();
const todoList = require("../controllers/todoListControllers");
const taskModel = require("../models/todoListModels");

router.get("/", paginatedRecords(taskModel), todoList.list_all_tasks);
router.post("/", getTokenFromRequestHeaders, todoList.create_a_task);
router.get("/:taskId", todoList.read_a_task);
router.put("/:taskId", todoList.update_a_task);
router.delete("/:taskId", todoList.delete_a_task);

function paginatedRecords(model) {
  //console.log("entered paginatedRecords method");
  // console.log(model.length);

  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let results = {};

    // console.log(
    //   page,
    //   limit,
    //   startIndex,
    //   endIndex,
    //   await model.countDocuments().exec() // counting directly from mongodb
    // );

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      results.records = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedRecords = results;
      next();
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
}

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

module.exports = router;
