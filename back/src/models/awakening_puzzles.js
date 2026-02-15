module.exports = function (sequelize, DataTypes) {
  const AwakeningPuzzle = sequelize.define(
    "awakening_puzzles",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      puzzle_key: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      grants_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.ENUM("simple", "special"),
        allowNull: false,
        defaultValue: "simple",
      },

      question: { type: DataTypes.TEXT, allowNull: false },
      hint: { type: DataTypes.TEXT, allowNull: true },
      hint_after_attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
      },

      accepted_answers: { type: DataTypes.TEXT, allowNull: false },
      near_answers: { type: DataTypes.TEXT, allowNull: true },
      near_hint: { type: DataTypes.TEXT, allowNull: true },

      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      tableName: "awakening_puzzles",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  return AwakeningPuzzle;
};
