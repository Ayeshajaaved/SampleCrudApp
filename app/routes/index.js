const express = require("express");
const router = express.Router();
const taskRouter = require("./task/index");
const userRouter = require("./user/index");

router.use("/tasks", taskRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

module.exports = router;
