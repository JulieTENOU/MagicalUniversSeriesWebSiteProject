const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const user_preferences = require("../models/preferences")(sequelize, DataTypes);

// Récupérer les préférences
exports.get = async function(req, res) {
  try {
    // user_id récupéré via le système de session/token que tu utilises déjà
    const users_ID = req.userId;
    const prefs = await user_preferences.findOne({ where: { users_ID } });
    if (!prefs) {
      return res.json({ user_theme: "dark", user_language: "fr" });
    }
    res.json(prefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Enregistrer/mettre à jour les préférences
exports.save = async function(req, res) {
  try {
    const users_ID = req.userId;
    console.log(req.userId);
    const { user_theme, user_language } = req.body;
    console.log(req.body)
    let prefs = await user_preferences.findOne({ where: { users_ID } });
    console.log(prefs);
    if (!prefs) {
      prefs = await user_preferences.create({ users_ID, user_theme, user_language });
    } else {
      prefs.user_theme = user_theme;
      console.log(prefs.user_theme);
      prefs.user_language = user_language;
      console.log(prefs.user_language);
      await prefs.save();
   console.log('Préférences après save:', prefs.dataValues);
    }
    res.json({ ok: true });
  } catch (err) {
  console.error('ERREUR PREF:', err); 
    res.status(500).json({ error: err.message });
  }
};
