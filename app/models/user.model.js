module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // validate: {
        //   isEmail: true,
        // },
      },
      // first_name: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // last_name: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        // defaultValue: Sequelize.fn("now"),
      },
      updated_at: {
        type: DataTypes.DATE,
        // defaultValue: null,
      },
    },
    {
      timestamps: true,
      underScored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
