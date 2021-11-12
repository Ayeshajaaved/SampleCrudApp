const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Tododb");

module.exports.mongooseConfig = mongoose;
