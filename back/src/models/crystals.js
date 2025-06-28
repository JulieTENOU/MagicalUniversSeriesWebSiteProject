const Sequelize = require("sequelize");
// const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "crystals",
    {
      crystal_verre: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      crystal_plasma: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      crystal_eau: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lapis: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      diams_violet: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      diams_vert: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      diams_turquoise: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      diams_carmin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      diams_ocre: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bille_arc: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      crystal_ange: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      crystal_dem: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      crystal_liquide: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pierre_lune: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      crystal_feu: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      crystal_or: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },      
      crystal_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      crystals_name_character: {
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
      tableName: "crystals",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "crystal_ID" }],
        },
        {
          name: "Name_character",
          using: "BTREE",
          fields: [{ name: "crystals_name_character" }],
        },
      ],
    }
  );
};