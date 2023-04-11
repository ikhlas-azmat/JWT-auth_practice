const { check, validationResult } = require("express-validator");

exports.validatePhoto = [
  check("userId")
    .not()
    .isEmpty()
    .withMessage("UserId can not be empty!")
    .isNumeric()
    .withMessage("Invalid ID!"),
  check("caption")
    .not()
    .isEmpty()
    .withMessage("Needs a caption!")
    .isLength({ max: 150 })
    .withMessage("Caption should be within 150 characters!"),
  check("latitude").isLatLong().withMessage("Invaild coordinates"),
  check("longitude").isLatLong().withMessage("Invaild coordinates"),
  check("scr")
    .not()
    .isEmpty()
    .withMessage("No source link provided!")
    .isURL()
    .withMessage("Invalid url!"),
  check("size").not().isEmpty().withMessage("Size is required!").isFloat(),
];

exports.photoValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.send({ status: "failed", message: error });
};
