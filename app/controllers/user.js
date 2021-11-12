const { getToken } = require("../utils/jwt");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const signUp = async (req, res) => {
  let user = await User.find({ email: req.body.email }).exec();
  if (user) {
    if (user && user.length > 0) {
      res.status(409).json({
        message: "User already exists.",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (!err) {
          console.log("Password hashed");
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
          });

          let userSaved = await user.save();

          console.log(userSaved);
          if (userSaved && userSaved.length > 0) {
            res.status(201).json({
              message: "User created.",
            });
          } else {
            res.status(500).json({
              message: "User creation failed. " + err,
            });
          }
        }
      });
    }
  }
};

const signIn = async (req, res) => {
  const user = await User.find({ email: req.body.email }).exec();
  try {
    if (user) {
      console.log(user[0]);
      bcrypt.compare(
        req.body.password,
        user[0].password,
        async (err, result) => {
          if (err) {
            console.log("error in password comparison" + err);
          } else {
            console.log(result);
            if (result) {
              console.log("login successful");
              let token = await getToken(req.body);

              console.log(token);
              res.status(200).json({
                token: token,
              });
            } else {
              res.status(403).json({
                message: "Authentication failed.",
              });
            }
          }
        }
      );
    } else {
      res.status(409).json({
        message: "Email address not registered.",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

const deleteUser = async (req, res) => {
  const userDeleted = await User.deleteOne({ _id: req.params.userId }).exec();

  if (userDeleted.deletedCount > 0) {
    res.status(200).json({ message: "user succesfully deleted" });
  } else {
    res.status(500).json({ message: "user cannot be deleted" });
  }
};

module.exports = {
  signUp,
  signIn,
  deleteUser,
};
