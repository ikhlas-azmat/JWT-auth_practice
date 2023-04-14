const { check, validationResult } = require("express-validator");

exports.validateComment = [
  check("userId")
    .not()
    .isEmpty()
    .withMessage("UserId is required!")
    .isNumeric()
    .withMessage("Invalid ID!"),
  check("photoId")
    .not()
    .isEmpty()
    .withMessage("PhotoId is required!")
    .isNumeric()
    .withMessage("Invalid ID!"),
  check("message")
    .not()
    .isEmpty()
    .withMessage("Comment can not be empty!")
    .isLength({ max: 250 }),
];

exports.commentValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.send({ status: "failed", message: error });
};
