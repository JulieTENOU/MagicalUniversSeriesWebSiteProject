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
  .filter(file => file !== "index.js" && file.endsWith(".js"))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associations définies manuellement
const {
  users,
  characters,
  inventory,
  currentGauges,
  ingredients,
  crystals,
  draconiqueHeart,
  competences,
  bonus_carac,
  bonus_energies,
  energies,
  races,
  planete,
  metiers,
  agences,
  series,
  books,
  book_parts,
  chapters,
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

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


// Debug log
console.log("✅ Models initialized & associations defined:", Object.keys(db));

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;