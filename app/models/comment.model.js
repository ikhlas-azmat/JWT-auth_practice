module.exports = (sequelize, Sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comment",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      photoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        // defaultValue: Sequelize.fn("now"),
      },
      updated_at: {
        type: DataTypes.DATE,
        // defaultValue: Sequelize.fn("now"),
      },
    },
    {
      timestamps: true,
      underScored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Comment;
};
