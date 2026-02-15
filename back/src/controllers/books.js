const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const bcrypt = require("bcrypt");
const { books, series } = require("../models");

module.exports = {
  create: async function (req, res) {
    console.log(req.body);
    if (req.body) {
      try {
        let { ID_book, ID_series, book_Name, path, image } = req.body;

        const newBook = await books.create({
          ID_book,
          ID_series,
          book_Name,
          path,
          image,
        });
        return res.status(201).send({ newBook });
      } catch (error) {
        return res.status(400).send({ error: error.message });
      }
    } else {
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  findAll: async function (req, res) {
    books
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
    books
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

  getBookByPath: async function (req, res) {
    const { serie, book } = req.params;

    try {
      const result = await books.findOne({
        where: { path: book },
        include: [
          {
            model: series,
            where: { path: serie },
          },
        ],
      });

      if (!result) {
        return res.status(404).json({ message: "Livre non trouvé." });
      }

      res.status(200).json({
        id: result.ID_book,
        name: result.book_Name,
        image: result.image,
        path: result.path,
        series: {
          title: result.series.series_title,
          path: result.series.path,
          ID_media: result.series.ID_media,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Erreur serveur. ${error}` });
    }
  },

  getBooksBySerie: async function (req, res) {
    const { serie } = req.params;

    try {
      const result = await books.findAll({
        include: [
          {
            model: series,
            where: { path: serie },
            attributes: ["series_title", "path", "ID_media"],
          },
        ],
        order: [["ID_book", "ASC"]],
      });

      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Aucun tome trouvé." });
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  },

  // This function updates a book's information.

  update: async function (req, res) {
    // console.log(req)
    const id = req.params.ID_book;
    console.log(id);
    books
      .findOne({
        where: {
          ID_book: id,
        },
      })
      .then(async (response) => {
        // We update the book
        const { ID_book, ID_series, book_series, book_Name, path, image } =
          req.body;
        const bookUpdate = {
          ID_book,
          ID_series,
          book_series,
          book_Name,
          path,
          image,
        };
        response.update(bookUpdate);
        res.send(response);
      })
      .catch((err) => {
        res
          .status(404)
          .send("We were unable to update your book because " + err);
      });
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
