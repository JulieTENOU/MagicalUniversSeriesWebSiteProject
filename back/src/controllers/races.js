const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const  races = require("../models/races")(sequelize, DataTypes);

module.exports = {  
  create: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          race_id,
          race_name,
          description,
        } = req.body;
        
        const newRace = await races.create({
          race_id,
          race_name,
          description,
        });
        return res.status(201).send({newRace});
      } catch (error){
        return res.status(400).send({error: error.message});
      }
    }else{
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  findAll: async function (req, res) {
    races
      .findAll(req.params)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "No races created yet!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving races...",
        });
      });
  },

  // This function find and returns one registered user based on one parameter.

  findOne: async function (req, res) {
    const id = req.params.race_id;
    races
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (data) => {
        if (data) {
          res.status(200).send({
            message: `Successfully connected to your race`,
          });
        } else {
          res.status(404).send({
            message: `Cannot find race with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving race with id=" + id,
        });
      });
  },

  // This function updates a user's information.

   update: async function (req, res) {
   // console.log(req)
    const id = req.params.race_id;
    console.log(id);
     races
       .findOne({
        where: {
          id: id,
         },
       })
       .then(async (response) => {
        // We update the book
             const {
              race_id,
              race_name,
              description,
             } = req.body;
             const raceUpdate = {
              race_id,
              race_name,
              description,
             };
             response.update(raceUpdate);
             res.send(response);
         }
       )
       .catch((err) => {
         res
           .status(404)
           .send("We were unable to update your race because " + err);
       });
   },

};