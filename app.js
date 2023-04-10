const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connection = require("./app/models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const port = process.env.PORT || 8000;

connection.sequelize
  .sync({ force: true })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("connection failed", err));

app.listen(port, () => console.log(`app is listening to ${port}`));

app.get("/", (req, res) => res.send("Welcome"));
