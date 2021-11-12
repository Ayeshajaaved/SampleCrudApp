const express = require("express");
const router = express.Router();
const taskRouter = require("./task");

router.use("/", taskRouter);

module.exports = router;
