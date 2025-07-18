const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const agences = require("../models/agences")(sequelize, DataTypes);

module.exports = {
  create: async function (req, res) {
    console.log(req.body);
    if (req.body) {
      try {
        let { agence_id, agence_name, agence_classement, agence_specialite } =
          req.body;

        const newAgence = await races.create({
          agence_id,
          agence_name,
          agence_classement,
          agence_specialite,
        });
        return res.status(201).send({ newAgence });
      } catch (error) {
        return res.status(400).send({ error: error.message });
      }
    } else {
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  findAll: async function (req, res) {
    agences
      .findAll(req.params)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "No agences created yet!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving agences...",
        });
      });
  },

  // This function find and returns one registered user based on one parameter.

  findOne: async function (req, res) {
    const id = req.params.agence_id;
    agences
      .findOne({
        where: {
          agence_id: id,
        },
      })
      .then(async (data) => {
        if (data) {
          res.status(200).send({
            message: `Successfully connected to your agence`,
          });
        } else {
          res.status(404).send({
            message: `Cannot find agence with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving agence with id=" + id,
        });
      });
  },

  // This function updates a user's information.

  update: async function (req, res) {
    // console.log(req)
    const id = req.params.agence_id;
    console.log(id);
    agences
      .findOne({
        where: {
          agence_id: id,
        },
      })
      .then(async (response) => {
        // We update the book
        const { agence_id, agence_name, agence_classement, agence_specialite } =
          req.body;
        const agenceUpdate = {
          agence_id,
          agence_name,
          agence_classement,
          agence_specialite,
        };
        response.update(agenceUpdate);
        res.send(response);
      })
      .catch((err) => {
        res
          .status(404)
          .send("We were unable to update your agence because " + err);
      });
  },
};
