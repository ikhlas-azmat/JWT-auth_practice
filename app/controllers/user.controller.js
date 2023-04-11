const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const isNewUserEmail = User.findOne({ email: email });
    if (isNewUserEmail) {
      res.status(409).json({
        status: "failed",
        message: "Email already exist!",
      });
      return false;
    } else {
      if (req.body.password === req.body.confirmPassword) {
        const userData = await User.create(req.body);
        if (userData) {
          res.status(200).json({
            status: "success",
            message: "User created!",
            userData,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ status: "failed", error: error });
  }
};
