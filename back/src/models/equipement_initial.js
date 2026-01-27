const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "equipement_initial",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_cible: {
        type: DataTypes.STRING(50),
        allowNull: false, // ex: "all" | "métiers"
      },
      cible_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // null quand type_cible = "all"
      },
      nom_objet: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      obligatoire: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0, // 1 obligatoire, 0 optionnel
      },
      groupe_choix: {
        type: DataTypes.STRING(80),
        allowNull: true, // ex: "groupe_choix_arcs"
      },
      quantite: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      tableName: "equipement_initial",
      timestamps: false,
    }
  );
};
