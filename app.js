const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connection = require("./app/models");
const userRoute = require("./app/routes/user.routes");
const photoRoute = require("./app/routes/photo.routes");
const avatarRoute = require("./app/routes/avatar.routes");
const commentRoute = require("./app/routes/comment.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const port = process.env.PORT || 8000;

connection.sequelize
  .sync({ alter: false }) // force: true
  .then(() => console.log("synced successfully."))
  .catch((err) => console.log("sync failed", err));

app.listen(port, () => console.log(`app is listening to ${port}`));

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.get("/", (req, res) => res.send("Welcome"));

app.use("/api/user", userRoute);
app.use("/api/photo", photoRoute);
app.use("/api/avatar", avatarRoute);
app.use("/api/comment", commentRoute);
