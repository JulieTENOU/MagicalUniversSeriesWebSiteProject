const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const character_media = sequelize.define(
    "character_media",
    {
      ID_character_media: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },

      ID_character: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },

      ID_media: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      slot: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      label: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      order_index: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      tableName: "character_media",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ID_character_media" }],
        },
        {
          name: "idx_cm_character",
          using: "BTREE",
          fields: [{ name: "ID_character" }],
        },
        {
          name: "idx_cm_media",
          using: "BTREE",
          fields: [{ name: "ID_media" }],
        },
        {
          name: "idx_cm_character_slot",
          using: "BTREE",
          fields: [{ name: "ID_character" }, { name: "slot" }],
        },
      ],
    },
  );

  return character_media;
};
