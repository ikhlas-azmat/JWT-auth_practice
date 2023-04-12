const { Sequelize, DataTypes } = require("sequelize");
const db = {};
const config = require("../config/db.config");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    logging: false,

    pool: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

db.sequelize = sequelize;
db.user = require("./user.model")(sequelize, Sequelize, DataTypes);
db.avatar = require("./avatar.model")(sequelize, Sequelize, DataTypes);
db.photo = require("./photo.model")(sequelize, Sequelize, DataTypes);
db.comment = require("./comment.model")(sequelize, Sequelize, DataTypes);

db.user.hasOne(db.avatar);
db.avatar.belongsTo(db.user);

db.user.hasMany(db.photo);
db.photo.belongsTo(db.user);

db.user.hasMany(db.comment);
db.comment.belongsTo(db.user);

db.photo.hasMany(db.comment);
db.comment.belongsTo(db.photo);

module.exports = db;
