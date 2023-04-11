const router = require("express").Router();
const { createUser } = require("../controllers/user.controller");
const {
  userValidation,
  validateCreateUser,
} = require("../middlewares/validation/user.validate");

router.post("/signup", validateCreateUser, userValidation, createUser);

module.exports = router;
