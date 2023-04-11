const { check, validationResult } = require("express-validator");

exports.validateComment = [
  check("userId")
    .not()
    .isEmpty()
    .withMessage("UserId can not be empty!")
    .isNumeric()
    .withMessage("Invalid ID!"),
  check("photoId")
    .not()
    .isEmpty()
    .withMessage("PhotoId can not be empty!")
    .isNumeric()
    .withMessage("Invalid ID!"),
];

exports.commentValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.send({ status: "failed", message: error });
};
