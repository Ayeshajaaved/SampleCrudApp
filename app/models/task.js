"use strict";

const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Kindly enter the name of the task",
  },
  author: {
    type: String,
    default: "XYZ",
    required: true,
  },
});

module.exports = mongoose.model("Tasks", TaskSchema);
