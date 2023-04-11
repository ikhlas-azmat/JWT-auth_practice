const router = require("express").Router();
const {} = require("../controllers/avatar.controller");
const {
  avatarValidation,
  validateAvatar,
} = require("../middlewares/validation/avatar.validate");

router.post("/", validateAvatar, avatarValidation);
router.get("/");

module.exports = router;
