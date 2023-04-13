module.exports = (sequelize, Sequelize, DataTypes) => {
  const Photo = sequelize.define(
    "photo",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      caption: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      scr: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      size: {
        type: DataTypes.FLOAT, // DECIMAL(10, 2)
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        // defaultValue: Sequelize.fn("now"),
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
  return Photo;
};
