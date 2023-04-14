const db = require("../models/");
const Avatar = db.avatar;
const User = db.user;

exports.createAvatar = async (req, res) => {
  try {
    const avatarData = req.body;
    const data = await Avatar.create(avatarData);
    if (data) {
      res.status(201).json({
        status: "success",
        message: "Avatar added successfully!",
        data: data,
      });
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Unable to add avatar!" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unexpected error occured!" });
  }
};

exports.getAvatar = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (user !== "undefined" && user !== null) {
      const avatarData = await Avatar.findAll({
        where: { id: user.id },
        attributes: { exclude: [["id", "uid"]] },
      });
      if (avatarData.length === 0) {
        res.status(400).json({ status: "failed", message: "No avatar!" });
      } else {
        res.status(201).json({
          status: "success",
          message: "Showing avatar!",
          data: avatarData,
        });
      }
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
