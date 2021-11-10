const jwt = require("jsonwebtoken");

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
  }
};

module.exports = verifyToken;
