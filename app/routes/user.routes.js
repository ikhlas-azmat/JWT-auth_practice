const router = require("express").Router();
const {
  createUser,
  signIn,
  getAllUserProfiles,
  getUserProfileById,
  getAllPosts,
  getPostById,
  findAllquery,
} = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/auth");
const {
  userValidation,
  validateCreateUser,
  validateUserSignIn,
} = require("../middlewares/validation/user.validate");

// post
router.post("/signup", validateCreateUser, userValidation, createUser);
router.post("/signin", validateUserSignIn, userValidation, signIn);

// protected
router.get("/profiles", isAuth, getAllUserProfiles);
router.get("/profiles/:id", isAuth, getUserProfileById);
router.get("/posts", isAuth, getAllPosts);
router.get("/posts/:id", isAuth, getPostById);
router.get("/query", isAuth, findAllquery);

module.exports = router;
