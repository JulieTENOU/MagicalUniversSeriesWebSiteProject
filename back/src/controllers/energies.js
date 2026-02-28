const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const  energies = require("../models/energies")(sequelize, DataTypes);

module.exports = {  
  create: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          id,
          nom,
        } = req.body;
        
        const newEnergy = await energies.create({
          id,
          nom,
        });
        return res.status(201).send({newEnergy});
      } catch (error){
        return res.status(400).send({error: error.message});
      }
    }else{
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  findAll: async function (req, res) {
    energies
      .findAll(req.params)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "No energies created yet!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error retrieving energies... : ${err}`,
        });
      });
  },

  // This function find and returns one registered user based on one parameter.

  findOne: async function (req, res) {
    const id = req.params.id;
    energies
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (data) => {
        if (data) {
          res.status(200).send({
            message: `Successfully connected to your energy`,
          });
        } else {
          res.status(404).send({
            message: `Cannot find energy with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving energy with id=" + id,
        });
      });
  },

  // This function updates a user's information.

   update: async function (req, res) {
   // console.log(req)
    const id = req.params.id;
    console.log(id);
     energies
       .findOne({
        where: {
          id: id,
         },
       })
       .then(async (response) => {
        // We update the book
             const {
              id,
              nom,
             } = req.body;
             const energyUpdate = {
              id,
              nom,
             };
             response.update(energyUpdate);
             res.send(response);
         }
       )
       .catch((err) => {
         res
           .status(404)
           .send("We were unable to update your energy because " + err);
       });
   },

};