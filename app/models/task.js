"use strict";

const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "XYZ",
    required: true,
  },
});

module.exports = mongoose.model("Tasks", taskSchema);
