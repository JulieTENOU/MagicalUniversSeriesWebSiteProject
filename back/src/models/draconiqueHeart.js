const Sequelize = require("sequelize");
// const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "draconiqueHeart",
    {
      CurrentManaEauDraconique: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CurrentManaTerreDraconique: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CurrentManaFeuDraconique: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CurrentManaAirDraconique: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ManaEauDraconiqueMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ManaTerreDraconiqueMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ManaFeuDraconiqueMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ManaAirDraconiqueMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ManaCelesteMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CurrentManaCeleste: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ID_draconiqueHeart: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Name_character: {
        type: DataTypes.STRING(30),
        allowNull: false,
        references: {
          model: "draconiqueHeart",
          key:"Name_character",
        },
      },
    },
    {
      sequelize,
      tableName: "draconiqueHeart",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ID_draconiqueHeart" }],
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