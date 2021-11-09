var express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

var mockLoginUser = {
  id: 1,
  username: "ayesha",
  email: "ayesha@gmail.com",
};

router.post("/", (req, res) => {
  jwt.sign({ user: mockLoginUser }, "secretKey", (err, token) => {
    res.json({
      token,
    });
  });
});

module.exports = router;
