const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;

const Media = require("../models/media")(sequelize, DataTypes);
const CharacterMedia = require("../models/character_media")(
  sequelize,
  DataTypes,
);

// IMPORTANT: adapte ce modèle selon ton projet si tu as déjà un model Character
const Character = require("../models/characters")(sequelize, DataTypes);

const UNIQUE_SLOTS = new Set(["avatar", "id_card"]);

function getUserId(req) {
  return req.userId || null;
}

module.exports = {
  // POST /characters/:ID_character/media
  attach: async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) return res.status(401).send({ message: "Non authentifié" });

      const ID_character = parseInt(req.params.ID_character, 10);
      const { ID_media, slot, label, order_index } = req.body;

      if (!Number.isFinite(ID_character)) {
        return res.status(400).send({ message: "ID_character invalide" });
      }
      const mediaId = parseInt(ID_media, 10);
      if (!Number.isFinite(mediaId) || !slot) {
        return res.status(400).send({ message: "ID_media et slot requis" });
      }

      // 1) check ownership media
      const m = await Media.findOne({ where: { ID_media: mediaId } });
      if (!m) return res.status(404).send({ message: "Media introuvable" });
      if (m.owner_user_id !== getUserId(req)) {
        return res
          .status(403)
          .send({ message: "Ce media ne t'appartient pas" });
      }

      // 2) check character belongs to user (ADAPTE ICI)
      // Je suppose characters a un champ ID_user
      const c = await Character.findOne({
        where: { ID_character, users_ID: getUserId(req) },
      });
      if (!c)
        return res.status(403).send({ message: "Personnage non autorisé" });

      // 3) slot unique => replace
      if (UNIQUE_SLOTS.has(slot)) {
        await CharacterMedia.destroy({ where: { ID_character, slot } });
      }

      const link = await CharacterMedia.create({
        ID_character,
        ID_media: mediaId,
        slot,
        label: label ?? null,
        order_index: Number.isFinite(parseInt(order_index, 10))
          ? parseInt(order_index, 10)
          : 0,
      });

      return res.status(201).send({
        ok: true,
        ID_character_media: link.ID_character_media,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: error.message });
    }
  },

  // GET /characters/:ID_character/media?slot=avatar|gallery|grimoire
  listByCharacter: async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) return res.status(401).send({ message: "Non authentifié" });

      const ID_character = parseInt(req.params.ID_character, 10);
      if (!Number.isFinite(ID_character)) {
        return res.status(400).send({ message: "ID_character invalide" });
      }

      // check character belongs to user (ADAPTE ICI)
      const c = await Character.findOne({
        where: { ID_character, users_ID: getUserId(req) },
      });
      if (!c)
        return res.status(403).send({ message: "Personnage non autorisé" });

      const where = { ID_character };
      if (req.query.slot) where.slot = String(req.query.slot);

      const items = await CharacterMedia.findAll({
        where,
        order: [
          ["slot", "ASC"],
          ["order_index", "ASC"],
          ["created_at", "ASC"],
        ],
      });

      const mapped = items.map((it) => ({
        ID_character_media: it.ID_character_media,
        ID_media: it.ID_media,
        slot: it.slot,
        label: it.label,
        order_index: it.order_index,
        url: `${req.protocol}://${req.get("host")}/api/media/getOneMedia/${it.ID_media}`,
      }));

      return res.send(mapped);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: error.message });
    }
  },

  // DELETE /characters/:ID_character/media/:ID_character_media
  detach: async (req, res) => {
    try {
      const userId = getUserId(req);
      if (!userId) return res.status(401).send({ message: "Non authentifié" });

      const ID_character = parseInt(req.params.ID_character, 10);
      const ID_character_media = parseInt(req.params.ID_character_media, 10);

      if (
        !Number.isFinite(ID_character) ||
        !Number.isFinite(ID_character_media)
      ) {
        return res.status(400).send({ message: "IDs invalides" });
      }

      // check character belongs to user (ADAPTE ICI)
      const c = await Character.findOne({
        where: { ID_character, users_ID: getUserId(req) },
      });
      if (!c)
        return res.status(403).send({ message: "Personnage non autorisé" });

      const deleted = await CharacterMedia.destroy({
        where: { ID_character_media, ID_character },
      });

      if (!deleted)
        return res.status(404).send({ message: "Lien introuvable" });
      return res.send({ ok: true });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: error.message });
    }
  },
};
