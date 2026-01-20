const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const { book_parts } = require("../models");

module.exports = {
  create: async function (req, res) {
    try {
      const { ID_book, part_name } = req.body;

      if (!ID_book || !part_name) {
        return res.status(400).json({ message: "Champs manquants." });
      }

      const newPart = await book_parts.create({
        ID_book,
        part_name,
      });

      res.status(201).json(newPart);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },

  findAll: async function (req, res) {
    try {
      const data = await book_parts.findAll();
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Aucune partie trouvée." });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur." });
    }
  },

  findOne: async function (req, res) {
    const id = req.params.ID_part;
    try {
      const part = await book_parts.findOne({
        where: { ID_part: id }
      });

      if (!part) {
        return res.status(404).json({ message: `Partie introuvable avec l'ID ${id}.` });
      }

      res.status(200).json(part);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur." });
    }
  },

  getByBook: async function (req, res) {
    const { bookId } = req.params;

    try {
      const parts = await book_parts.findAll({
        where: { ID_book: bookId },
        order: [["ID_part", "ASC"]],
      });

      if (!parts || parts.length === 0) {
        return res.status(404).json({ message: "Aucune partie trouvée pour ce livre." });
      }

      res.status(200).json(parts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur." });
    }
  },

  update: async function (req, res) {
    const id = req.params.ID_part;

    try {
      const part = await book_parts.findOne({ where: { ID_part: id } });

      if (!part) {
        return res.status(404).json({ message: "Partie non trouvée." });
      }

      const { ID_book, part_name } = req.body;

      await part.update({ ID_book, part_name });

      res.status(200).json(part);
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la mise à jour." });
    }
  },
};
