const Sequelize = require("sequelize");
// const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "creatures",
    {
      ID_creatures: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Name_character: {
        type: DataTypes.STRING(30),
        allowNull: false,
        references: {
          model: "character",
          key:"Name_character",
        },
      },
      creature1: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature2: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature3: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature4: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature5: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature6: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature7: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature8: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature9: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature10: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature11: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature12: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature13: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature14: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      creature15: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "creatures",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ID_creatures" }],
        },
        {
          name: "Name_character",
          using: "BTREE",
          fields: [{ name: "creatures_name_character" }],
        },
      ],
    }
  );
};