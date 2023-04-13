const router = require("express").Router();
const { createPhoto } = require("../controllers/photo.controller");
const { isAuth } = require("../middlewares/auth");
const {
  photoValidation,
  validatePhoto,
} = require("../middlewares/validation/photo.validate");

router.post("/createpost", isAuth, createPhoto, validatePhoto, photoValidation);

module.exports = router;
