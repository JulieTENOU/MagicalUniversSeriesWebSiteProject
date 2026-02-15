const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;

const media = require("../models/media")(sequelize, DataTypes);

const fs = require("fs");

const ALLOWED_PREFIX = "/var/www/mus_storage/images/";

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
};
