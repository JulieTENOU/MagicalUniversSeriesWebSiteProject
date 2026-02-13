const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      users_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      users_pseudo: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      users_email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "Unique",
      },
      users_password: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      users_status: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      users_reset_token: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      users_reset_expires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "users_ID" }],
        },
        {
          name: "Unique",
          unique: true,
          using: "BTREE",
          fields: [{ name: "users_email" }],
        },
      ],
    },
  );
};
