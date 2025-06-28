const Sequelize = require("sequelize");
const dbConfig = require("../config/db-config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;