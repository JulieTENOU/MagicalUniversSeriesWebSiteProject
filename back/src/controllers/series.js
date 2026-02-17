const { series, books, chapters } = require("../models");

module.exports = {
  create: async function (req, res) {
    console.log(req.body);
    if (req.body) {
      try {
        let { ID_series, series_title, ID_media, path } = req.body;

        const newSerie = await series.create({
          ID_series,
          series_title,
          ID_media,
          path,
        });
        return res.status(201).send({ newSerie });
      } catch (error) {
        return res.status(400).send({ error: error.message });
      }
    } else {
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  findAll: async function (req, res) {
    series
      .findAll(req.params)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "No serie created yet!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving series...",
        });
      });
  },

  // This function find and returns one registered user based on one parameter.

  findOne: async function (req, res) {
    const id = req.params.ID_series;
    series
      .findOne({
        where: {
          ID_series: id,
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
    const id = req.params.ID_series;
    console.log(id);
    series
      .findOne({
        where: {
          ID_series: id,
        },
      })
      .then(async (response) => {
        // We update the book
        const { ID_series, series_title, ID_media, path } = req.body;
        const bookUpdate = {
          ID_series,
          series_title,
          ID_media,
          path,
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

  findAllReadable: async function (req, res) {
    try {
      const data = await series.findAll({
        // ✅ garde tes champs série
        attributes: ["ID_series", "series_title", "ID_media", "path"],

        // ✅ seulement les séries qui ont au moins 1 book
        //    qui a au moins 1 chapter
        include: [
          {
            model: books,
            attributes: [], // on n'a pas besoin des books ici
            required: true, // inner join => il faut au moins 1 book
            include: [
              {
                model: chapters,
                attributes: [], // on n'a pas besoin des chapters ici
                required: true, // inner join => il faut au moins 1 chapter
              },
            ],
          },
        ],

        // ✅ évite les doublons (1 série peut avoir N chapters)
        distinct: true,

        order: [["ID_series", "ASC"]],
      });

      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error retrieving readable series." });
    }
  },
};
