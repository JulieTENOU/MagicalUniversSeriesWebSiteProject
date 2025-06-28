const Sequelize = require("sequelize");
// const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "currentGauges",
    {
      
      currentManaVital: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      currentManaEau: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      currentManaTerre: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      currentManaFeu: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      currentManaAir: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      currentManaVolonte: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      currentStamina: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      currentGauges_ID: {
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
    },
    {
      sequelize,
      tableName: "currentGauges",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "currentGauges_ID" }],
        },
        {
          name: "Name_character",
          using: "BTREE",
          fields: [{ name: "Name_character" }],
        },
      ],
    }
  );
};