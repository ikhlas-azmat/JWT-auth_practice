const router = require("express").Router();
const {
  createUser,
  signIn,
  getAll,
  getById,
} = require("../controllers/user.controller");
const {
  userValidation,
  validateCreateUser,
  validateUserSignIn,
} = require("../middlewares/validation/user.validate");

// post
router.post("/signup", validateCreateUser, userValidation, createUser);
router.post("/signin", validateUserSignIn, userValidation, signIn);

// get
router.get("/", getAll);
router.get("/:id", getById);

// protected

module.exports = router;
