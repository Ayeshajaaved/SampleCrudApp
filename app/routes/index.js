const express = require("express");
const router = express.Router();
const taskRouter = require("./task/index");
const loginRouter = require("./login/index");

router.use("/tasks", taskRouter);
router.use("/api/login", loginRouter);

module.exports = router;
