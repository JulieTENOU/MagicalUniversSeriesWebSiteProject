const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  const Book = sequelize.define(
    "books",
    {
      ID_book: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ID_series: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "series",
          key: "ID_series",
        },
      },
      book_Name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      ID_media: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "books",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ID_books" }],
        },
        {
          name: "ID_series",
          using: "BTREE",
          fields: [{ name: "ID_series" }],
        },
      ],
    },
  );
  // Book.associate = function (models) {
  //   Book.belongsTo(models.series, {
  //     foreignKey: "ID_series",
  //   });

  //   Book.hasMany(models.chapters, {
  //     foreignKey: "ID_book",
  //   });

  //   Book.hasMany(models.book_parts, {
  //     foreignKey: "ID_book",
  //   });
  // };

  return Book;
};
