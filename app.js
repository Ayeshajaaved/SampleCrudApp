const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const router = require("./app/routes");

require("./app/configs/config");
app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port);
console.log("Server started on: " + port);
