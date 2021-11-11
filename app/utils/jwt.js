const jwt = require("jsonwebtoken");

const getToken = (req) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("inside getToken");
      jwt.sign(
        {
          email: req.email,
        },
        "secretKey",
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { getToken };
