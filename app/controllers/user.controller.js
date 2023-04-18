const jwt = require("jsonwebtoken");
const db = require("../models/");
const bcrypt = require("bcrypt");
const config = require("../config/db.config");
const { QueryTypes, Sequelize } = require("sequelize");

const sequelize = db.sequelize;
const User = db.user;
const Photo = db.photo;
const Comment = db.comment;

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const isNewUserEmail = await User.findOne({ where: { email: email } });
    if (isNewUserEmail) {
      res.status(409).json({
        status: "failed",
        message: "Email already exist!",
      });
      return false;
    } else {
      if (username && email && password && confirmPassword) {
        if (password === confirmPassword) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const userData = await User.create({
              username: username,
              email: email,
              password: hashPassword,
            });
            if (userData) {
              const saveUser = await User.findOne({ where: { email: email } });
              const token = jwt.sign(
                { UserId: saveUser.id },
                config.auth.secret,
                {
                  expiresIn: "3d",
                }
              );
              res.status(201).json({
                status: "success",
                message: "User created!",
                userData: userData,
                token: token,
              });
            }
          } catch (error) {
            console.log(error);
            res
              .status(500)
              .json({ status: "failed", message: "Unable to Register!" });
          }
        } else {
          res.status(400).json({
            status: "failed",
            message: "Password and Confirm Password do not match!",
          });
        }
      } else {
        res.status(400).json({
          status: "failed",
          message: "All fields are required!",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const userData = await User.findOne({ where: { email: email } });
      if (userData != null) {
        const isMatch = await bcrypt.compare(password, userData.password);
        if (userData.email === email && isMatch) {
          const token = jwt.sign({ userId: userData.id }, config.auth.secret, {
            expiresIn: "3d",
          });
          res.status(201).json({
            status: "success",
            message: "Login successful!",
            userData: [userData.id, userData.email],
            token: token,
          });
        } else {
          res.status(400).json({
            status: "failed",
            message: "Email and/or Password is Invalid!",
          });
        }
      } else {
        res.status(400).json({ status: "failed", message: "Missing fields!" });
      }
    } else {
      res.status(500).json({ status: "failed", message: "Unable to Login!" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUserProfiles = async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ["id", "password", "updated_at"],
      },
      offset: 0,
      limit: 10,
    });
    if (userData != null) {
      res
        .status(200)
        .json({ status: "success", message: "Showing all users!", userData });
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Failed to get users" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unexpected error occured!" });
  }
};

exports.getUserProfileById = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findOne({
      where: { id: id },
      attributes: { exclude: ["password"] },
    });
    if (userData != null) {
      res
        .status(200)
        .json({ status: "success", message: "Found user!", userData });
    } else {
      res.status(400).json({ status: "failed", message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unexpected error occured!" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: [["id", "uid"], "password", "created_at", "updated_at"],
      },
      include: {
        model: Photo,
        attributes: { exclude: [["id", "pid"], "userId", "size"] },
        // required: true,
        include: {
          model: Comment,
        },
      },
      offset: 0,
      limit: 10,
      // raw: true,
      // nest: true,
    });
    if (userData != null) {
      res
        .status(200)
        .json({ status: "success", message: "Showing all posts!", userData });
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Failed to get posts" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unexpected error occured!" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findOne({
      attributes: { exclude: [["id", "uid"], "password"] },
      include: {
        model: Photo,
        attributes: { exclude: [["id", "pid"], "userId"] },
      },
      where: { id: id },
    });
    if (userData != null) {
      res
        .status(200)
        .json({ status: "success", message: "Found post!", userData });
    } else {
      res.status(400).json({ status: "failed", message: "Post not found!" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unexpected error occured!" });
  }
};

exports.findAllquery = async (req, res) => {
  const data = await sequelize.query(
    `SELECT username, email, caption, scr, message
     FROM users u
     LEFT JOIN photos p
     ON u.id = p.userId
     LEFT JOIN comments c
     ON u.id = c.userId`,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.send(data);
};

exports.countUsers = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: {
        exclude: ["id", "password", "created_at", "updated_at"],
      },
      include: {
        model: Photo,
        attributes: {
          exclude: [
            "id",
            "userId",
            "caption",
            "latitude",
            "longitude",
            "size",
            "scr",
            "created_at",
            "updated_at",
          ],
          include: [
            [sequelize.fn("COUNT", sequelize.col("scr")), "total_photos"],
          ],
        },
        include: {
          model: Comment,
          required: true,
          attributes: {
            exclude: [
              "id",
              "userId",
              "photoId",
              "message",
              "created_at",
              "updated_at",
            ],
            include: [
              [
                sequelize.fn("COUNT", sequelize.col("message")),
                "total_comments",
              ],
            ],
          },
        },
      },
      group: "user.id",
      raw: true,
    });
    res.send({ data: data });
  } catch (error) {
    console.log(error);
  }
};

exports.countUserQuery = async (req, res) => {
  try {
    const data = await sequelize.query(
      `SELECT username, COUNT(p.scr) AS total_photos, COUNT(c.message) AS total_comments
      FROM users u
      LEFT JOIN photos p
      ON u.id = p.userId
      LEFT JOIN comments c
      ON u.id = c.userId
      GROUP BY u.id`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.send({ data: data });
  } catch (error) {
    console.log(error);
  }
};

exports.createQuery = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const isNewEmail = await User.findOne({ where: { email: email } });
    if (isNewEmail) {
      res.status(409).json({
        status: "failed",
        message: "Email already exist!",
      });
    } else {
      if ((username, email, password, confirmPassword)) {
        if (password === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const data = await sequelize.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?);",
            {
              type: QueryTypes.INSERT,
              replacements: [username, email, hashPassword],
            }
          );
          res
            .status(201)
            .json({ status: "success", message: "Inserted data!", data: data });
        } else {
          res.status(400).json({
            status: "falied",
            message: "Password and confirm password do not match!",
          });
        }
      } else {
        res
          .status(400)
          .json({ status: "failed", message: "All fields are required!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.destroy({ where: { id: id } });
    if (user) {
      res.status(201).json({ status: "success", message: "Deleted user!" });
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "User does not exist!" });
    }
  } catch (error) {
    console.log(error);
  }
};
