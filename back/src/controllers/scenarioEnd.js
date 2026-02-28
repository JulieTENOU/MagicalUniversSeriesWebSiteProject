// controllers/scenarioController.js
const { sequelize, characters, currentGauges } = require("../models");

const GAUGE_FIELDS = [
  "ManaVital_character",
  "ManaEau_character",
  "ManaTerre_character",
  "ManaFeu_character",
  "ManaAir_character",
  "ManaVolonte_character",
  "Stamina_character",
];

function safeInt(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

module.exports = {
  endScenario: async (req, res) => {
    const { targets, rewardsByChar } = req.body || {};
    if (!Array.isArray(targets) || !targets.length) {
      return res.status(400).json({ error: "targets manquant" });
    }

    // Optionnel: tu peux filtrer les rewards invalides ici
    // (field non autorisé, delta non nombre, etc.)
    try {
      const result = await sequelize.transaction(async (t) => {
        const summaries = [];

        for (const id of targets) {
          const char = await characters.findOne({
            where: { ID_character: id },
            transaction: t,
          });

          if (!char) continue;

          const rewards = Array.isArray(rewardsByChar?.[id])
            ? rewardsByChar[id]
            : [];

          // 1) Update des stats max (characters)
          // On applique chaque delta sur le champ demandé
          const updatePatch = {};
          const applied = [];

          for (const r of rewards) {
            const field = r?.field;
            const delta = safeInt(r?.delta, 0);
            if (!field || !delta) continue;

            // Important: on ne fait pas confiance au field venant du front
            // -> whitelist basée sur les champs du modèle
            if (!(field in char.dataValues)) continue;

            const current = safeInt(char[field], 0);
            updatePatch[field] = current + delta;
            applied.push({
              field,
              delta,
              before: current,
              after: current + delta,
            });
          }

          if (Object.keys(updatePatch).length) {
            await char.update(updatePatch, { transaction: t });
          }

          // 2) Reset gauges au max APRES update du char
          const name = char.Name_character;
          if (!name) {
            summaries.push({
              ID_character: id,
              Name_character: null,
              applied,
              gaugesReset: false,
              reason: "Name_character manquant",
            });
            continue;
          }

          const gaugesPatch = {
            currentManaVital: safeInt(char.ManaVital_character, 0),
            currentManaEau: safeInt(char.ManaEau_character, 0),
            currentManaTerre: safeInt(char.ManaTerre_character, 0),
            currentManaFeu: safeInt(char.ManaFeu_character, 0),
            currentManaAir: safeInt(char.ManaAir_character, 0),
            currentManaVolonte: safeInt(char.ManaVolonte_character, 0),
            currentStamina: safeInt(char.Stamina_character, 0),
          };

          const gaugesRow = await currentGauges.findOne({
            where: { Name_character: name },
            transaction: t,
          });

          if (gaugesRow) {
            await gaugesRow.update(gaugesPatch, { transaction: t });
          } else {
            // si pas de ligne gauges => on la crée (tu as déjà un fallback côté front)
            await currentGauges.create(
              { Name_character: name, ...gaugesPatch },
              { transaction: t },
            );
          }

          summaries.push({
            ID_character: id,
            Name_character: name,
            applied,
            gaugesReset: true,
            newMax: Object.fromEntries(
              GAUGE_FIELDS.map((f) => [f, safeInt(char[f], 0)]),
            ),
          });
        }

        return summaries;
      });

      // 3) Option: émission socket depuis ici (si tu as accès à io)
      // Je te montre plus bas comment le faire proprement.

      return res.status(200).json({ ok: true, result });
    } catch (e) {
      console.error("endScenario error:", e);
      return res.status(500).json({ error: e.message });
    }
  },
};
