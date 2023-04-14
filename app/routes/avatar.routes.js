const router = require("express").Router();
const { getAvatar, createAvatar } = require("../controllers/avatar.controller");
const { isAuth } = require("../middlewares/auth");
const {
  avatarValidation,
  validateAvatar,
} = require("../middlewares/validation/avatar.validate");

router.post("/", isAuth, createAvatar, validateAvatar, avatarValidation);
router.get("/:id", getAvatar);

module.exports = router;
