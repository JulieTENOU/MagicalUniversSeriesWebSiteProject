const { user_read_progress, awakening_puzzles } = require("../models");

// normalisation: minuscules + trim + retire accents
function normalize(str = "") {
  return str
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function parseList(text) {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

module.exports = {
  solve: async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) return res.status(401).json({ error: "UNAUTHENTICATED" });

      const { puzzle_key, answer } = req.body;
      if (!puzzle_key || typeof answer !== "string") {
        return res.status(400).json({ error: "BAD_REQUEST" });
      }

      const puzzle = await awakening_puzzles.findOne({
        where: { puzzle_key, is_active: true },
      });
      if (!puzzle) return res.status(400).json({ error: "UNKNOWN_PUZZLE" });

      const a = normalize(answer);

      const accepted = parseList(puzzle.accepted_answers).map(normalize);
      const ok = accepted.includes(a);
      if (ok) {
        const [progress] = await user_read_progress.findOrCreate({
          where: { users_ID: userId },
          defaults: { awaken_level: 0 },
        });

        if ((progress.awaken_level ?? 0) < puzzle.grants_level) {
          progress.awaken_level = puzzle.grants_level;
          await progress.save();
        }

        return res.json({ ok: true, new_level: progress.awaken_level });
      }

      // ✅ gestion "presque bon" (type special)
      if (puzzle.type === "special") {
        const near = parseList(puzzle.near_answers).map(normalize);
        if (near.includes(a) && puzzle.near_hint) {
          return res.json({
            ok: false,
            near: true,
            near_hint: puzzle.near_hint,
          });
        }
      }

      return res.json({ ok: false });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "SERVER_ERROR" });
    }
  },

  getPuzzle: async (req, res) => {
    try {
      const { puzzle_key } = req.params;

      const puzzle = await awakening_puzzles.findOne({
        where: { puzzle_key, is_active: true },
      });
      if (!puzzle) return res.status(404).json({ error: "UNKNOWN_PUZZLE" });

      // On renvoie uniquement ce dont le front a besoin
      return res.json({
        puzzle_key: puzzle.puzzle_key,
        grants_level: puzzle.grants_level,
        type: puzzle.type,
        question: puzzle.question,
        hint: puzzle.hint,
        hint_after_attempts: puzzle.hint_after_attempts,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "SERVER_ERROR" });
    }
  },
};
