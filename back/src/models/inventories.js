const Sequelize = require("sequelize");
// const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "inventory",
    {
      inventory_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      inventory_name_character: {
        type: DataTypes.STRING(30),
        allowNull: false,
        references: {
          model: "character",
          key:"Name_character",
        },
      },
      arme1Name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      arme1Damage: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      arme1Scope: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      arme1Ammunition: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      arme2Name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      arme2Damage: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      arme2Scope: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      arme2Ammunition: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      arme3Name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      arme3Damage: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      arme3Scope: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      arme3Ammunition: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      armure1Name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      armure1Cac: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      armure1Dist: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      armure1Effect: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      armure2Name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      armure2Cac: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      armure2Dist: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      armure2Effect: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      armure3Name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      armure3Cac: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      armure3Dist: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      armure3Effect: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      important1: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      important2: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      important3: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      important4: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      important5: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      divers1_inventory: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      divers2_inventory: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      divers3_inventory: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      divers4_inventory: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      divers5_inventory: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      divers6_inventory: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      divers7_inventory: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      divers8_inventory: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      divers9_inventory: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      divers10_inventory: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      divers1Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      divers2Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      divers3Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      divers4Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      divers5Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      divers6Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      divers7Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      divers8Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      divers9Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      divers10Quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      repas_inventory: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      autres_inventory: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      PPU: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      POU: {
      type: DataTypes.INTEGER,
      allowNull: true,
      },
      PAU: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
     
    },
    {
      sequelize,
      tableName: "inventory",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "inventory_ID" }],
        },
        {
          name: "Name_character",
          using: "BTREE",
          fields: [{ name: "inventory_name_character" }],
        },
      ],
    }
  );
};