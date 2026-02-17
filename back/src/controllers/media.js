const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;

const media = require("../models/media")(sequelize, DataTypes);

const fs = require("fs");

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
      return res.status(500).send({ error: error.message });
    }
  },

  uploadOne: async function (req, res) {
    try {
      const userId = getUserId(req);
      if (!userId) return res.status(401).send({ message: "Non authentifié" });

      if (!req.file) {
        return res.status(400).send({ message: "Aucun fichier reçu" });
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
      return res.status(500).send({ error: error.message });
    }
  },
};
