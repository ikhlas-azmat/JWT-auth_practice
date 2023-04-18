const router = require("express").Router();
const {
  createUser,
  signIn,
  getAllUserProfiles,
  getUserProfileById,
  getAllPosts,
  getPostById,
  findAllquery,
  countUsers,
  countUserQuery,
  createQuery,
  deleteUser,
  deleteUserQuery,
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
router.post("/insert", validateCreateUser, userValidation, createQuery);

// protected
router.get("/profiles", isAuth, getAllUserProfiles);
router.get("/profiles/:id", isAuth, getUserProfileById);
router.get("/posts", isAuth, getAllPosts);
router.get("/posts/:id", isAuth, getPostById);
router.get("/query", isAuth, findAllquery);
router.get("/count", countUsers);
router.get("/countquery", countUserQuery);

// destroy
router.delete("/delete", deleteUser);
router.delete("/deletequery", deleteUserQuery);

module.exports = router;
