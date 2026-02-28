module.exports = function (sequelize, DataTypes) {
  const ChapterTranslation = sequelize.define(
    "chapter_translations",
    {
      ID_chapter_translation: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ID_chapter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "chapters", key: "ID_chapter" },
      },
      lang: {
        type: DataTypes.STRING(5),
        allowNull: false, // 'fr', 'en'
      },
      title: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "chapter_translations",
      timestamps: false,
      indexes: [
        { unique: true, fields: ["ID_chapter", "lang"] },
        { fields: ["lang"] },
      ],
    },
  );

  // ChapterTranslation.associate = function (models) {
  //   ChapterTranslation.belongsTo(models.chapters, { foreignKey: "ID_chapter" });
  // };

  return ChapterTranslation;
};
