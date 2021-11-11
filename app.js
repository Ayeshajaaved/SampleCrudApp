const express = require("express");
const app = express();
const router = require("./app/routes");

require("./app/configs/config");
app.use("/", router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port);
console.log("Server started on: " + port);
