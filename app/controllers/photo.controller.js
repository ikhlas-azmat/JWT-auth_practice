const db = require("../models");
const Photo = db.photo;

exports.createPhoto = async (req, res) => {
  try {
    const photoData = req.body;
    const data = await Photo.create(photoData);
    if (data) {
      res.status(201).json({
        status: "success",
        message: "Photo posted successfully!",
        data: data,
      });
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Unable to post photo!" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unexpected error occured!" });
  }
};
