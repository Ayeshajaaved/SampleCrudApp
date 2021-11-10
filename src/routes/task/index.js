"use strict";
var express = require("express");
const router = express.Router();
const taskController = require("../../controllers/task");
const taskModel = require("../../models/task");
const verifyTokenMiddleware = require("../../middlewares/auth");

router.get("/", paginatedRecords(taskModel), taskController.list_all_tasks);
router.post("/", verifyTokenMiddleware, taskController.create_a_task);
router.get("/:taskId", verifyTokenMiddleware, taskController.read_a_task);
router.put("/:taskId", taskController.update_a_task);
router.delete("/:taskId", taskController.delete_a_task);

function paginatedRecords(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let results = {};

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

module.exports = router;
