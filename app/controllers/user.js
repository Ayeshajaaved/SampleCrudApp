const express = require("express");
const router = express.Router();
const { getToken } = require("../utils/jwt");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const signUp = (req, res) => {
  // check if user already exists

  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user && user.length > 0) {
        res.status(409).json({
          message: "User already exists.",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (!err) {
            console.log("Password hashed");
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created.",
                  userDetails: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "User creation failed. " + err,
                });
              });
          }
        });
      }
    });
};

const signIn = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user && user.length > 0) {
        console.log(user[0]);
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            console.log("error in password comparison" + err);
          } else {
            if (result) {
              console.log("login successful");
              getToken(req.body)
                .then((token) => {
                  res.status(200).json({
                    message: token,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        });
      } else {
        res.status(409).json({
          message: "Authentication Failed!",
        });
      }
    })
    .catch();
};

const deleteUser = (req, res) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(() => {
      res.status(200).json({ message: "user deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "user cannot be deleted" });
    });
};

module.exports = {
  signUp,
  signIn,
  deleteUser,
};
