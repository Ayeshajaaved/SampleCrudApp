const express = require("express");
const router = express.Router();

const validator = require("../../middlewares/validator");
const { signUp, signIn, deleteUser } = require("../../controllers/user");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.post("/signup", validator("signUpSchema"), signUp);
router.post("/signin", signIn);
router.delete("/:userId", deleteUser);
module.exports = router;
