const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const bcrypt = require("bcrypt");
const series = require("../models/series")(sequelize, DataTypes);

module.exports = {
  create: async function (req, res) {
    console.log(req.body);
    if (req.body) {
      try {
        let { ID_series, series_title, image, path } = req.body;

        const newSerie = await series.create({
          ID_series,
          series_title,
          image,
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
        const { ID_series, series_title, image, path } = req.body;
        const bookUpdate = {
          ID_series,
          series_title,
          image,
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
