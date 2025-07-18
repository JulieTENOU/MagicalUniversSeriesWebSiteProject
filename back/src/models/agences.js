const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "agences",
    {
      agence_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      agence_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      agence_classement: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      agence_specialite: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "agences",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "agence_id" }],
        },
      ],
    }
  );
};