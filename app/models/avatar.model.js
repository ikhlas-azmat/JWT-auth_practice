module.exports = (sequelize, Sequelize, DataTypes) => {
  const Avatar = sequelize.define(
    "avatar",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      scr: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      size: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      underScored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Avatar;
};
