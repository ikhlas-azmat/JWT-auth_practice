const jwt = require("jsonwebtoken");
const db = require("../models/");
const User = db.user;

exports.isAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("JWT")) {
    try {
      token = authorization.split(" ")[1];
      if (token !== "undefined") {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(userId).select("-password");
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ status: "failed", message: "Unauthorized User" });
    }
  }
};
