const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const media = sequelize.define(
    "media",
    {
      ID_media: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },

      kind: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "image", // plus tard: audio / video
      },

      storage: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "local",
      },

      filename: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      original_name: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },

      disk_path: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },

      mime_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      alt: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "media",
      timestamps: false, // comme tes autres modèles
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ID_media" }],
        },
        {
          name: "idx_media_filename",
          using: "BTREE",
          fields: [{ name: "filename" }],
        },
      ],
    },
  );

  return media;
};
