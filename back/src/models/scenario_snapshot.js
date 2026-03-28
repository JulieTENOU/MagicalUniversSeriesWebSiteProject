module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "scenario_snapshot",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      character_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      snapshot_data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "scenario_snapshots",
      timestamps: false,
      indexes: [
        { name: "PRIMARY", unique: true, using: "BTREE", fields: [{ name: "id" }] },
        { name: "character_id", unique: true, using: "BTREE", fields: [{ name: "character_id" }] },
      ],
    }
  );
};
