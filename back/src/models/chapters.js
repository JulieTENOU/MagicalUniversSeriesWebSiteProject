const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "books",
    {
      ID_chapter: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ID_book: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "books",
          key:"ID_book",
        },
      },
      title_chapter: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      content_chapter: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      path_next: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      path_prev: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      book_part: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Chapters",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ID_chapter" }],
        },
        {
          name: "ID_book",
          using: "BTREE",
          fields: [{name: "ID_book"}]
        }
      ],
    }
  );
};