const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  const Chapter = sequelize.define(
    "chapters",
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
          key: "ID_book",
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
      required_level_access: {
        type: DataTypes.INTEGER,
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
      ID_part: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "book_parts",
          key: "ID_part",
        },
      },
    },
    {
      sequelize,
      tableName: "chapters",
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
          fields: [{ name: "ID_book" }],
        },
      ],
    },
  );

  Chapter.associate = function (models) {
    Chapter.belongsTo(models.books, {
      foreignKey: "ID_book",
    });

    Chapter.belongsTo(models.book_parts, {
      foreignKey: "ID_part",
      as: "part",
    });
    Chapter.hasMany(models.chapter_translations, {
      foreignKey: "ID_chapter",
      as: "translations",
    });
  };

  return Chapter;
};
