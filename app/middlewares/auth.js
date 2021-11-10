const jwt = require("jsonwebtoken");

const mockLoginUser = {
  id: 1,
  username: "ayesha",
  email: "ayesha@gmail.com",
};

const getToken = (req, res, next) => {
  jwt.sign({ user: mockLoginUser }, "secretKey", (err, token) => {
    if (err) {
      res.send(err);
    } else {
      res.token = token;
      next();
    }
  });
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];

    jwt.verify(bearerToken, "secretKey", (err) => {
      if (err) {
        res.status(403).send("Invalid token.");
      } else {
        next();
      }
    });
  } else {
    res.status(403).send("Token not passed.");
  }
};

module.exports = { verifyToken, getToken };
