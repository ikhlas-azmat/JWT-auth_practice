const db = require("../models/");
const Comment = db.comment;

exports.createComment = async (req, res) => {
  try {
    const commentData = req.body;
    const data = await Comment.create(commentData);
    if (data) {
      res.status(201).json({
        status: "success",
        message: "Comment posted successfully!",
        data: data,
      });
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Unable to post comment!" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unexpected error occured!" });
  }
};
