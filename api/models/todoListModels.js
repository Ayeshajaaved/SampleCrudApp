"use strict";

var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Kindly enter the name of the task",
  },
  author: {
    type: String,
    default: "XYZ",
  },
});

module.exports = mongoose.model("Tasks", TaskSchema);
