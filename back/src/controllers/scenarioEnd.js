// controllers/scenarioController.js
const { sequelize, characters, currentGauges, scenario_snapshot } = require("../models");

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
  // POST /api/scenario/start
  // body: { targets: [charId, ...] }
  // Capture un snapshot des stats actuelles pour chaque personnage ciblé.
  // Upsert : si un snapshot existe déjà, il est remplacé (reprise de scénar).
  startScenario: async (req, res) => {
    const { targets } = req.body || {};
    if (!Array.isArray(targets) || !targets.length) {
      return res.status(400).json({ error: "targets manquant" });
    }

    try {
      const rows = await characters.findAll({ where: { ID_character: targets } });

      await Promise.all(
        rows.map((char) =>
          scenario_snapshot.upsert({
            character_id: char.ID_character,
            snapshot_data: char.dataValues,
            created_at: new Date(),
          })
        )
      );

      return res.status(200).json({ ok: true, count: rows.length });
    } catch (e) {
      console.error("startScenario error:", e);
      return res.status(500).json({ error: e.message });
    }
  },

  // GET /api/scenario/snapshots?ids=1,2,3
  // Retourne les snapshots actifs pour les IDs demandés.
  // Si un personnage n'a pas de snapshot, il n'apparaît pas dans la réponse.
  getSnapshots: async (req, res) => {
    const raw = req.query.ids || "";
    const ids = raw
      .split(",")
      .map((s) => parseInt(s, 10))
      .filter(Number.isFinite);

    if (!ids.length) {
      return res.status(400).json({ error: "ids manquant" });
    }

    try {
      const rows = await scenario_snapshot.findAll({
        where: { character_id: ids },
      });

      // { [charId]: snapshotData }
      const result = {};
      for (const row of rows) {
        result[row.character_id] = row.snapshot_data;
      }

      return res.status(200).json({ ok: true, data: result });
    } catch (e) {
      console.error("getSnapshots error:", e);
      return res.status(500).json({ error: e.message });
    }
  },

  // POST /api/scenario/end  (inchangé fonctionnellement + suppression des snapshots)
  endScenario: async (req, res) => {
    const { targets, rewardsByChar } = req.body || {};
    if (!Array.isArray(targets) || !targets.length) {
      return res.status(400).json({ error: "targets manquant" });
    }

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

          const updatePatch = {};
          const applied = [];

          for (const r of rewards) {
            const field = r?.field;
            const delta = safeInt(r?.delta, 0);
            if (!field || !delta) continue;
            if (!(field in char.dataValues)) continue;

            const current = safeInt(char[field], 0);
            updatePatch[field] = current + delta;
            applied.push({ field, delta, before: current, after: current + delta });
          }

          if (Object.keys(updatePatch).length) {
            await char.update(updatePatch, { transaction: t });
          }

          const name = char.Name_character;
          if (!name) {
            summaries.push({ ID_character: id, Name_character: null, applied, gaugesReset: false, reason: "Name_character manquant" });
            continue;
          }

          const gaugesPatch = {
            currentManaVital:   safeInt(char.ManaVital_character, 0),
            currentManaEau:     safeInt(char.ManaEau_character, 0),
            currentManaTerre:   safeInt(char.ManaTerre_character, 0),
            currentManaFeu:     safeInt(char.ManaFeu_character, 0),
            currentManaAir:     safeInt(char.ManaAir_character, 0),
            currentManaVolonte: safeInt(char.ManaVolonte_character, 0),
            currentStamina:     safeInt(char.Stamina_character, 0),
          };

          const gaugesRow = await currentGauges.findOne({ where: { Name_character: name }, transaction: t });
          if (gaugesRow) {
            await gaugesRow.update(gaugesPatch, { transaction: t });
          } else {
            await currentGauges.create({ Name_character: name, ...gaugesPatch }, { transaction: t });
          }

          summaries.push({
            ID_character: id,
            Name_character: name,
            applied,
            gaugesReset: true,
            newMax: Object.fromEntries(GAUGE_FIELDS.map((f) => [f, safeInt(char[f], 0)])),
          });
        }

        return summaries;
      });

      // Suppression des snapshots maintenant que le scénario est terminé
      await scenario_snapshot.destroy({ where: { character_id: targets } });

      return res.status(200).json({ ok: true, result });
    } catch (e) {
      console.error("endScenario error:", e);
      return res.status(500).json({ error: e.message });
    }
  },
};
