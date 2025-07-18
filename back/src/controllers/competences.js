const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const  competences = require("../models/competences")(sequelize, DataTypes);

module.exports = {  
  create: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          id,
          nom,
          parent_id,
        } = req.body;
        
        const newComp = await competences.create({
          id,
          nom,
          parent_id,
        });
        return res.status(201).send({newComp});
      } catch (error){
        return res.status(400).send({error: error.message});
      }
    }else{
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  findAll: async function (req, res) {
    competences
      .findAll(req.params)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "No competences created yet!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving compentences...",
        });
      });
  },

  // This function find and returns one registered user based on one parameter.

  findOne: async function (req, res) {
    const id = req.params.id;
    competences
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (data) => {
        if (data) {
          res.status(200).send({
            message: `Successfully connected to your compentence`,
          });
        } else {
          res.status(404).send({
            message: `Cannot find compentence with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving competence with id=" + id,
        });
      });
  },

  // This function updates a user's information.

   update: async function (req, res) {
   // console.log(req)
    const id = req.params.id;
    console.log(id);
     competences
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
              parent_id,
             } = req.body;
             const compUpdate = {
              id,
              nom,
              parent_id,
             };
             response.update(compUpdate);
             res.send(response);
         }
       )
       .catch((err) => {
         res
           .status(404)
           .send("We were unable to update your competence because " + err);
       });
   },

};