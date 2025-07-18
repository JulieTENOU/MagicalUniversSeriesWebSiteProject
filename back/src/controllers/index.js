const controller = {};

controller.user = require("./users");
controller.characters = require("./characters");
controller.currentGauges = require("./currentGauges");
controller.inventories = require("./inventories");
controller.ingredients = require("./ingredients");
controller.crystals = require("./crystals");
controller.creatures = require("./creatures");
controller.authService = require("./authService");
controller.draconiqueHeart = require("./draconiqueHeart");
controller.books = require("./books");
controller.chapters = require("./chapters");
controller.series = require("./series");
controller.book_parts = require("./book_parts");
controller.preferences = require("./preferences");
controller.competences = require("./competences");
controller.races = require("./races");
controller.planete = require("./planete");
controller.metiers = require("./metiers");
controller.energies = require("./energies");
controller.bonus_carac = require("./bonus_carac");
controller.bonus_energies = require("./bonus_energies");
controller.agences = require("./agences");

module.exports = controller;