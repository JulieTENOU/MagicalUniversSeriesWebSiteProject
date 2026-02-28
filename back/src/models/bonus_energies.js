const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const energies = require("./energies");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "bonus_energies",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      type_cible: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      cible_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ressource_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "energies",
          key:"id",
        },
      },
      valeur: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "bonus_energies",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "energies",
          using: "BTREE",
          fields: [{name: "id"}]
        }
      ],
    }
  );
};