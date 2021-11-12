"use strict";

const express = require("express");
const taskController = require("../../controllers/task");
const auth = require("../../middlewares/auth");
const validator = require("../../middlewares/validator");
const verifyToken = auth.verifyToken;

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", verifyToken, taskController.list_all_tasks);

router.post(
  "/",
  validator("taskSchema"),
  verifyToken,
  taskController.create_a_task
);

router.get("/:taskId", verifyToken, taskController.read_a_task);
router.put("/:taskId", validator("taskSchema"), taskController.update_a_task);
router.delete("/:taskId", taskController.delete_a_task);

module.exports = router;
