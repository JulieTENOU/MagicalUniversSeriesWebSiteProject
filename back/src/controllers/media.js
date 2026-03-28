const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;

const media = require("../models/media")(sequelize, DataTypes);

const fs = require("fs");
const serverError = require("../../utils/serverError.js");

const ALLOWED_PREFIX = "/var/www/mus_storage/images/";

function getUserId(req) {
  return req.userId || null;
}
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authKey");

module.exports = {
  // GET /media/get/:ID_media (ou ce que tu décideras côté routes)
  getOne: async function (req, res) {
    try {
      const id = parseInt(req.params.ID_media, 10);
      if (Number.isNaN(id)) {
        return res.status(400).send({ message: "ID_media invalide" });
      }

      const item = await media.findOne({
        where: { ID_media: id },
      });

      if (!item) {
        return res
          .status(404)
          .send({ message: `Media introuvable (ID_media=${id})` });
      }

      if (item.visibility === "private") {
        const token = req.session?.token;
        if (!token) {
          return res.status(401).send({ message: "Authentification requise" });
        }

        let decoded;
        try {
          decoded = jwt.verify(token, authConfig.secret);
        } catch (e) {
          return res.status(403).send({ message: "Invalid or expired token!" });
        }

        const userId = decoded.id;
        if (!item.owner_user_id || item.owner_user_id !== userId) {
          return res.status(403).send({ message: "Accès refusé" });
        }
      }

      // Sécurité: on ne sert que depuis ton dossier images
      if (!item.disk_path || !item.disk_path.startsWith(ALLOWED_PREFIX)) {
        return res.status(403).send({ message: "Chemin non autorisé" });
      }

      if (!fs.existsSync(item.disk_path)) {
        return res.status(404).send({ message: "Fichier absent sur disque" });
      }

      res.setHeader("Content-Type", item.mime_type);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

      fs.createReadStream(item.disk_path).pipe(res);
    } catch (error) {
      console.error(error);
      return serverError(res, error);
    }
  },

  uploadOne: async function (req, res) {
    try {
      const userId = getUserId(req);
      if (!userId) return res.status(401).send({ message: "Non authentifié" });

      if (!req.file) {
        return res.status(400).send({ message: "Aucun fichier reçu" });
      }

      // Vérification magic bytes
      if (req.file.mimetype.startsWith("image/")) {
        const buf = Buffer.alloc(12);
        const fd = fs.openSync(req.file.path, "r");
        fs.readSync(fd, buf, 0, 12, 0);
        fs.closeSync(fd);
        const isJpeg = buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF;
        const isPng  = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47;
        const isGif  = buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46;
        const isWebp = buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46
                    && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50;
        const valid = (req.file.mimetype === "image/jpeg" && isJpeg)
                   || (req.file.mimetype === "image/png"  && isPng)
                   || (req.file.mimetype === "image/gif"  && isGif)
                   || (req.file.mimetype === "image/webp" && isWebp);
        if (!valid) {
          fs.unlinkSync(req.file.path);
          return res.status(400).send({ message: "Contenu du fichier incompatible avec le type déclaré" });
        }
      }

      const created = await media.create({
        kind: "image",
        storage: "local",
        filename: req.file.filename,
        original_name: req.file.originalname,
        disk_path: req.file.path,
        mime_type: req.file.mimetype,
        size: req.file.size,
        alt: null,
        owner_user_id: getUserId(req),
        visibility: "private",
      });

      return res.status(201).send({
        ID_media: created.ID_media,
      });
    } catch (error) {
      console.error(error);
      return serverError(res, error);
    }
  },

  deleteOne: async function (req, res) {
    try {
      const userId = getUserId(req);
      if (!userId) return res.status(401).send({ message: "Non authentifié" });

      const id = parseInt(req.params.ID_media, 10);
      if (Number.isNaN(id)) {
        return res.status(400).send({ message: "ID_media invalide" });
      }

      const item = await media.findOne({ where: { ID_media: id } });
      if (!item) return res.status(404).send({ message: "Media introuvable" });

      // ownership
      if (!item.owner_user_id || item.owner_user_id !== userId) {
        return res
          .status(403)
          .send({ message: "Ce media ne t'appartient pas" });
      }

      // ⚠️ On vérifie tous les liens character_media de ce media
      const CharacterMedia = require("../models/character_media")(
        sequelize,
        DataTypes,
      );
      const Character = require("../models/characters")(sequelize, DataTypes);

      const links = await CharacterMedia.findAll({ where: { ID_media: id } });

      // Si le media est lié à un personnage qui n'appartient pas à l'user => refuse
      if (links.length > 0) {
        const charIds = [...new Set(links.map((l) => l.ID_character))];

        const owned = await Character.findAll({
          where: { ID_character: charIds, users_ID: userId },
          attributes: ["ID_character"],
        });

        const ownedSet = new Set(owned.map((c) => c.ID_character));
        const notOwned = charIds.filter((cid) => !ownedSet.has(cid));

        if (notOwned.length) {
          return res.status(403).send({
            message: "Media lié à un personnage non autorisé",
          });
        }

        // ok => on supprime tous les liens
        await CharacterMedia.destroy({ where: { ID_media: id } });
      }

      // sécurité disque
      if (!item.disk_path || !item.disk_path.startsWith(ALLOWED_PREFIX)) {
        return res.status(403).send({ message: "Chemin non autorisé" });
      }

      // delete fichier si existe
      if (fs.existsSync(item.disk_path)) {
        try {
          fs.unlinkSync(item.disk_path);
        } catch (e) {
          console.error("unlink failed:", e);
          return res
            .status(500)
            .send({ message: "Impossible de supprimer le fichier" });
        }
      }

      // delete row media
      await media.destroy({ where: { ID_media: id } });

      return res.send({ ok: true });
    } catch (error) {
      console.error(error);
      return serverError(res, error);
    }
  },
};
