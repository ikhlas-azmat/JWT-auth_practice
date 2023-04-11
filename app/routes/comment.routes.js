const router = require("express").Router();
const {} = require("../controllers/comment.controller");
const {
  commentValidation,
  validateComment,
} = require("../middlewares/validation/comment.validate");

router.post("/", validateComment, commentValidation);
router.get("/");

module.exports = router;
