const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const dbConfig = require("../config/db-config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

// Associations définies manuellement
const {
  agences,
  awakening_puzzles,
  bonus_carac,
  bonus_energies,
  book_parts,
  books,
  chapters,
  characters,
  character_media,
  competences,
  creatures,
  crystals,
  currentGauges,
  draconiqueHeart,
  energies,
  equipement_initial,
  ingredients,
  inventory,
  media,
  metiers,
  planete,
  preferences,
  races,
  series,
  user_read_progress,
  users,
} = db;

// === Associations ===
// Users
users.hasMany(characters, { foreignKey: "users_ID" });
characters.belongsTo(users, { foreignKey: "users_ID" });

// Characters → sous-tables liées par name
characters.hasOne(inventory, { foreignKey: "inventory_name_character" });
inventory.belongsTo(characters, { foreignKey: "inventory_name_character" });

characters.hasOne(currentGauges, { foreignKey: "Name_character" });
currentGauges.belongsTo(characters, { foreignKey: "Name_character" });

characters.hasOne(ingredients, { foreignKey: "ingredients_name_character" });
ingredients.belongsTo(characters, { foreignKey: "ingredients_name_character" });

characters.hasOne(crystals, { foreignKey: "crystals_name_character" });
crystals.belongsTo(characters, { foreignKey: "crystals_name_character" });

characters.hasOne(draconiqueHeart, { foreignKey: "Name_character" });
draconiqueHeart.belongsTo(characters, { foreignKey: "Name_character" });

// Bonus carac / énergies → compétences / énergies
competences.hasMany(bonus_carac, { foreignKey: "competence_id" });
bonus_carac.belongsTo(competences, { foreignKey: "competence_id" });

energies.hasMany(bonus_energies, { foreignKey: "ressource_id" });
bonus_energies.belongsTo(energies, { foreignKey: "ressource_id" });

media.hasMany(character_media, { foreignKey: "ID_media" });
character_media.belongsTo(media, { foreignKey: "ID_media" });

// Si tu as le modèle Character :
characters.hasMany(character_media, { foreignKey: "ID_character" });
character_media.belongsTo(characters, { foreignKey: "ID_character" });

// ============================
// ASSOCIATIONS (centralisées)
// ============================

// SERIES -> BOOKS
db.series.hasMany(db.books, {
  foreignKey: "ID_series",
  sourceKey: "ID_series",
});
db.books.belongsTo(db.series, {
  foreignKey: "ID_series",
  targetKey: "ID_series",
});

// BOOKS -> CHAPTERS
db.books.hasMany(db.chapters, {
  foreignKey: "ID_book",
  sourceKey: "ID_book",
});
db.chapters.belongsTo(db.books, {
  foreignKey: "ID_book",
  targetKey: "ID_book",
});

// BOOKS -> BOOK_PARTS
db.books.hasMany(db.book_parts, {
  foreignKey: "ID_book",
  sourceKey: "ID_book",
});
db.book_parts.belongsTo(db.books, {
  foreignKey: "ID_book",
  targetKey: "ID_book",
});

// BOOK_PARTS -> CHAPTERS
// ⚠️ important: dans ton modèle Chapter tu as: belongsTo(book_parts, { as: "part" })
// donc ici on garde le même alias "part" côté belongsTo
db.book_parts.hasMany(db.chapters, {
  foreignKey: "ID_part",
  sourceKey: "ID_part",
  as: "chapters",
});
db.chapters.belongsTo(db.book_parts, {
  foreignKey: "ID_part",
  targetKey: "ID_part",
  as: "part",
});

// CHAPTERS -> CHAPTER_TRANSLATIONS
if (db.chapter_translations) {
  db.chapters.hasMany(db.chapter_translations, {
    foreignKey: "ID_chapter",
    sourceKey: "ID_chapter",
    as: "translations",
  });
  db.chapter_translations.belongsTo(db.chapters, {
    foreignKey: "ID_chapter",
    targetKey: "ID_chapter",
    as: "chapter",
  });
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Debug log
console.log("✅ Models initialized & associations defined:", Object.keys(db));

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
