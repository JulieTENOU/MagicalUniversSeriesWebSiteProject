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
      owner_user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true, // NULL = media système
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

      visibility: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "public",
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
        {
          name: "idx_media_owner_user",
          using: "BTREE",
          fields: [{ name: "owner_user_id" }],
        },
        {
          name: "idx_media_visibility",
          using: "BTREE",
          fields: [{ name: "visibility" }],
        },
      ],
    },
  );

  return media;
};
