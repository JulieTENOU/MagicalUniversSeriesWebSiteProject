const { user_read_progress } = require("../models");

// normalisation: minuscules + trim + retire accents
function normalize(str = "") {
  return str
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const PUZZLES_FR = {
  level_1: {
    grants_level: 1,
    question: "Quelle émotion déclenche l’Éveil de l’héroïne ?",
    hint: "",
    accepted: ["peur", "terreur", "effroi", "panique"],
  },
  level_2: {
    grants_level: 2,
    question:
      "ꓘɹolᴉx Zɐɟɹo ⅂ᴉuƃʞo ꟽᴉuƃɐ ꓘɐɹlox Sɔɹɐlʎʍ Ⅎlnǝuƃɐs Ʇɹᴉɐ ᗡƃʎɯpɐ ⅂ǝupɹo Ⅎɹoɹᴉʞo ⅁ʎɐɯᴉlɐlpᴉo Sɔoǝlpᴉo Ʇǝɯǝlᴉo Λɐlʎ Mɐu Ʇsɥǝlʎ Sʍᴉuʞz",
    hint: "Quand le jour s’est levé ici, il y fera nuit. Quand l’espoir renaîtra chez nous, on avait abandonné là-bas. Mais quand demain finira, hier commencera, et aujourd’hui s’oubliera. ",
    accepted: ["spritz"],
  },
  // level_3: { ... } plus tard
};

module.exports = {
  solve: async (req, res) => {
       try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: "UNAUTHENTICATED" });

      const { puzzle_key, answer } = req.body;
      if (!puzzle_key || typeof answer !== "string") {
        return res.status(400).json({ error: "BAD_REQUEST" });
      }

      const puzzle = PUZZLES_FR[puzzle_key];
      if (!puzzle) return res.status(400).json({ error: "UNKNOWN_PUZZLE" });

      const a = normalize(answer);
      const ok = puzzle.accepted.map(normalize).includes(a);
      if (!ok) return res.json({ ok: false });

      const [progress] = await user_read_progress.findOrCreate({
        where: { users_ID: userId },
        defaults: { awaken_level: 0 },
      });

      if ((progress.awaken_level ?? 0) < puzzle.grants_level) {
        progress.awaken_level = puzzle.grants_level;
        await progress.save();
      }

      return res.json({ ok: true, new_level: progress.awaken_level });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "SERVER_ERROR" });
    }
  },

  // Bonus: endpoint pour donner la question au front (optionnel)
  getPuzzle: async (req, res) => {
    const { puzzle_key } = req.params;
    const puzzle = PUZZLES_FR[puzzle_key];
    if (!puzzle) return res.status(404).json({ error: "UNKNOWN_PUZZLE" });
    return res.json({ puzzle_key, question: puzzle.question, hint: puzzle.hint });
  },
};
