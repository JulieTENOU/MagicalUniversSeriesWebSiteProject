const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  const BookPart = sequelize.define(
    "book_parts",
    {
      ID_part: {
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
      part_name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "book_parts",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ID_part" }],
        },
        {
          name: "ID_book",
          using: "BTREE",
          fields: [{ name: "ID_book" }],
        },
      ],
    }
  );

  BookPart.associate = function (models) {
    BookPart.belongsTo(models.books, {
      foreignKey: "ID_book",
    });

    BookPart.hasMany(models.chapters, {
      foreignKey: "ID_part",
      as: "chapters",
    });
  };

  return BookPart;
};
