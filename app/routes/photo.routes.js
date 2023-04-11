const router = require("express").Router();
const {} = require("../controllers/photo.controller");
const {
  photoValidation,
  validatePhoto,
} = require("../middlewares/validation/photo.validate");

router.post("/", validatePhoto, photoValidation);
router.get("/");

module.exports = router;
