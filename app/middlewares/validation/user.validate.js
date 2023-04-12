const { check, validationResult } = require("express-validator");

exports.validateCreateUser = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username is required!")
    .isAlphanumeric()
    .withMessage("Invalid username!")
    .isLength({ min: 4, max: 25 })
    .withMessage("Username should be between 4 to 50 characters long!")
    .matches(/^[A-Z,a-z]{1}[A-Z,a-z,0-9]{3,24}$/),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid email!"),
  // check("first_name")
  //   .not()
  //   .isEmpty()
  //   .withMessage("First Name is required!")
  //   .not()
  //   .isAlpha()
  //   .withMessage("Please enter a valid name!")
  //   .isLength({ max: 25 }),
  // check("last_name")
  //   .not()
  //   .isEmpty()
  //   .withMessage("Last Name is required!")
  //   .not()
  //   .isAlpha()
  //   .withMessage("Please enter a valid name!")
  //   .isLength({ max: 25 }),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long!"),
  check("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Confrim password can not be empty!")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and Confirm Password do not match!");
      }
      return true;
    }),
];

exports.validateUserSignIn = [
  check("email").trim().isEmail().withMessage("Invalid email!"),
  check("password").not().isEmpty().withMessage("Password is required!"),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.send({ status: "failed", message: error });
};
