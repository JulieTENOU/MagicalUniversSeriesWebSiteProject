const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const bcrypt = require("bcrypt");
const {
  chapters,
  books,
  series,
  book_parts,
  user_read_progress,
} = require("../models");

module.exports = {
  create: async function (req, res) {
    console.log(req.body);
    if (req.body) {
      try {
        let {
          ID_book,
          ID_chapter,
          title_chapter,
          content_chapter,
          path,
          path_next,
          path_prev,
          book_part,
        } = req.body;

        const newChapter = await chapters.create({
          ID_book,
          ID_chapter,
          title_chapter,
          content_chapter,
          path,
          path_next,
          path_prev,
          book_part,
        });
        return res.status(201).send({ newChapter });
      } catch (error) {
        return res.status(400).send({ error: error.message });
      }
    } else {
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  findAll: async function (req, res) {
    chapters
      .findAll(req.params)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "No book created yet!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving books...",
        });
      });
  },

  // This function find and returns one registered user based on one parameter.

  findOne: async function (req, res) {
    const id = req.params.ID_book;
    chapters
      .findOne({
        where: {
          ID_book: id,
        },
      })
      .then(async (data) => {
        if (data) {
          res.status(200).send({
            message: `Successfully connected to your book`,
          });
        } else {
          res.status(404).send({
            message: `Cannot find book with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving book with id=" + id,
        });
      });
  },

  // This function updates a user's information.

  update: async function (req, res) {
    // console.log(req)
    const id = req.params.ID_book;
    console.log(id);
    chapters
      .findOne({
        where: {
          ID_book: id,
        },
      })
      .then(async (response) => {
        // We update the book
        const {
          ID_book,
          ID_chapter,
          title_chapter,
          content_chapter,
          path,
          path_next,
          path_prev,
          book_part,
        } = req.body;
        const chaptersUpdate = {
          ID_book,
          ID_chapter,
          title_chapter,
          content_chapter,
          path,
          path_next,
          path_prev,
          book_part,
        };
        response.update(chaptersUpdate);
        res.send(response);
      })
      .catch((err) => {
        res
          .status(404)
          .send("We were unable to update your book because " + err);
      });
  },

  getChapterByPath: async function (req, res) {
    const { serie, book, chapter } = req.params;

    try {
      const foundBook = await books.findOne({
        where: { path: book },
        include: [{ model: series, where: { path: serie } }],
      });

      if (!foundBook) {
        return res.status(404).json({ message: "Livre introuvable." });
      }

      const foundChapter = await chapters.findOne({
        where: {
          ID_book: foundBook.ID_book,
          path: chapter, // ici on suppose que `path` est simple, ex: "0"
        },
        include: [
          {
            model: books,
            include: [{ model: series }],
          },
          {
            model: book_parts,
            as: "part",
            attributes: ["part_name"],
            required: false,
          },
        ],
      });

      if (!foundChapter) {
        return res.status(404).json({ message: "Chapitre non trouvé." });
      }

      // ✅ --- GATE: progression Éveil (global) ---
      const userId = req.userId; // adapte si ton auth stocke l'id ailleurs
      if (!userId) {
        return res.status(401).json({ error: "UNAUTHENTICATED" });
      }

      // récupère / crée la progression du user
      const [progress] = await user_read_progress.findOrCreate({
        where: { users_ID: userId },
        defaults: { awaken_level: 0 },
      });

      const userLevel = progress.awaken_level ?? 0;
      const requiredLevel = foundChapter.required_level_access ?? 0;

      // bloque si pas le bon niveau
      if (userLevel < requiredLevel) {
        return res.status(403).json({
          error: "AWAKEN_LOCKED",
          required_level: requiredLevel,
          current_level: userLevel,
          puzzle_key: `level_${requiredLevel}`,
          prev: foundChapter.path_prev || null,
          next: foundChapter.path_next || null,
        });
      }
      // ✅ --- fin GATE ---

      res.status(200).json({
        id: foundChapter.ID_chapter,
        title: foundChapter.title_chapter,
        content: foundChapter.content_chapter,
        path: foundChapter.path,
        prev: foundChapter.path_prev || null,
        next: foundChapter.path_next || null,
        book: {
          name: foundChapter.book?.book_Name,
          image: foundChapter.book?.image,
          path: foundChapter.book?.path,
        },
        part: foundChapter.part?.part_name ?? null,
        series: {
          title: foundChapter.book?.series?.series_title,
          image: foundChapter.book?.series?.image,
          path: foundChapter.book?.series?.path,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur." });
    }
  },

  getChaptersByBookPath: async function (req, res) {
    const { serie, book } = req.params;
    try {
      // Trouve le livre pour avoir l'ID
      const foundBook = await books.findOne({
        where: { path: book },
        include: [
          {
            model: series,
            where: { path: serie },
          },
        ],
      });

      if (!foundBook) {
        return res.status(404).json({ message: "Livre introuvable" });
      }

      // Récupère les chapitres
      const chaptersList = await chapters.findAll({
        where: { ID_book: foundBook.ID_book },
        include: [{ model: book_parts, as: "part", attributes: ["part_name"] }], // si association définie
        order: [["ID_chapter", "ASC"]],
      });
      console.log(JSON.stringify(chaptersList, null, 2));

      res.status(200).json(chaptersList);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // This function deletes a user.

  // delete: async function (req, res) {
  //   const email = req.user;
  //   users
  //     .findOne({
  //       where: {
  //         userEmail: email,
  //       },
  //     })
  //     .then((response) => {
  //       response.destroy();
  //       res.send("Profil has been deleted succesfully!");
  //     })
  //     .catch((err) => {
  //       res
  //         .status(404)
  //         .send(
  //           "We were unable to delete your profil. Please feel free to retry! Justification: " +
  //             err
  //         );
  //     });
  // },
};
