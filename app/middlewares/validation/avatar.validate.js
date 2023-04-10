const { check, validationResult } = require("express-validator");

exports.validateAvatar = [
  check("userId")
    .not()
    .isEmpty()
    .withMessage("UserId can not be empty!")
    .isNumeric(),
  // .isAlphanumeric()
  // .withMessage("Invalid ID!")
  check("scr").not().isEmpty().withMessage("No source link provided!").isURL(),
  check("size")
    .not()
    .isEmpty()
    .withMessage("No source link provided!")
    .isDecimal(),
];

exports.avatarValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.send({ status: "failed", message: error });
};
