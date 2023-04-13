const router = require("express").Router();
const { createComment } = require("../controllers/comment.controller");
const { isAuth } = require("../middlewares/auth");
const {
  commentValidation,
  validateComment,
} = require("../middlewares/validation/comment.validate");

router.post("/", isAuth, createComment, validateComment, commentValidation);

module.exports = router;
