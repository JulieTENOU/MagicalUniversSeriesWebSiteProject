const Sequelize = require("sequelize");
// const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ingredients",
    {
      ID_ingredients: {
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
      ingredient1: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient1Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient2: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient2Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient3: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient3Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient4: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient4Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient5: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient5Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient6: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient6Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient7: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient7Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient8: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient8Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient9: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient9Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient10: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient10Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient11: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient11Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient12: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient12Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient13: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient13Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient14: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient14Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingredient15: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      ingredient15Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
     
     
    },
    {
      sequelize,
      tableName: "ingredients",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ID_ingredients" }],
        },
        {
          name: "Name_character",
          using: "BTREE",
          fields: [{ name: "ingredients_name_character" }],
        },
      ],
    }
  );
};