const express = require("express");
const router = express.Router();
const taskRouter = require("./task/index");
const loginRouter = require("./login/index");

router.use("/tasks", taskRouter);
router.use("/api/login", loginRouter);

router.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

module.exports = router;
