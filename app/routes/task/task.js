"use strict";

const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/task");
const taskModel = require("../../models/task");
const auth = require("../../middlewares/auth");
const paginateRecords = require("../../middlewares/paginate");
const validator = require("../../middlewares/validator");
const verifyToken = auth.verifyToken;
// console.log(verifyToken);

router.get("/", paginateRecords(taskModel), taskController.list_all_tasks);

router.post(
  "/",
  verifyToken,
  validator("taskSchema"),
  taskController.create_a_task
);

router.get("/:taskId", verifyToken, taskController.read_a_task);
router.put("/:taskId", taskController.update_a_task);
router.delete("/:taskId", taskController.delete_a_task);

module.exports = router;
