const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user_preferences",
    {
      users_ID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "users",
          key: "users_ID"
        }
      },
      user_theme: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "dark"
      },
      user_language: {
        type: DataTypes.STRING(5),
        allowNull: false,
        defaultValue: "fr"
      }
    },
    {
      sequelize,
      tableName: "user_preferences",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "users_ID" }]
        }
      ]
    }
  );
};
