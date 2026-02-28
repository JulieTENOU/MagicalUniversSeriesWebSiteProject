const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const bcrypt = require("bcrypt");
const  bonus_energies = require("../models/bonus_energies")(sequelize, DataTypes);

module.exports = {  
  create: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          id,
          type_cible,
          cible_id,
          ressource_id,
          valeur,
          description,
        } = req.body;
        
        const newBonusEnergy = await bonus_energies.create({
          id,
          type_cible,
          cible_id,
          ressource_id,
          valeur,
          description,
        });
        return res.status(201).send({newBonusEnergy});
      } catch (error){
        return res.status(400).send({error: error.message});
      }
    }else{
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  findAll: async function (req, res) {
    bonus_energies
      .findAll(req.params)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "No energies bonus created yet!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving energies bonus...",
        });
      });
  },

  // This function find and returns one registered user based on one parameter.

  findOne: async function (req, res) {
    const id = req.params.id;
    bonus_energies
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (data) => {
        if (data) {
          res.status(200).send({
            message: `Successfully connected to your energies bonus`,
          });
        } else {
          res.status(404).send({
            message: `Cannot find energies bonus with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving caracteristics bonus with id=" + id,
        });
      });
  },

  // This function updates a user's information.

   update: async function (req, res) {
   // console.log(req)
    const id = req.params.id;
    console.log(id);
     bonus_energies
       .findOne({
        where: {
          id: id,
         },
       })
       .then(async (response) => {
        // We update the book
             const {
              id,
              type_cible,
              cible_id,
              ressource_id,
              valeur,
              description,
             } = req.body;
             const bonusEnergyUpdate = {
              id,
              type_cible,
              cible_id,
              ressource_id,
              valeur,
              description,
             };
             response.update(bonusEnergyUpdate);
             res.send(response);
         }
       )
       .catch((err) => {
         res
           .status(404)
           .send("We were unable to update your energies bonus because " + err);
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