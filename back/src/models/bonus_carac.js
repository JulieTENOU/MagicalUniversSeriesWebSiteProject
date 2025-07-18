const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const competences = require("./competences");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "bonus_carac",
    {
      bonus_id: {
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
      competence_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "competences",
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
      tableName: "bonus_carac",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "bonus_id" }],
        },
        {
          name: "competences",
          using: "BTREE",
          fields: [{name: "id"}]
        }
      ],
    }
  );
};