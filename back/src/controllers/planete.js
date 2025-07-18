const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const  planete = require("../models/planete")(sequelize, DataTypes);

module.exports = {  
  create: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          planete_id,
          planete_name,
          planete_description,
        } = req.body;
        
        const newPlanete = await planete.create({
          planete_id,
          planete_name,
          planete_description,
        });
        return res.status(201).send({newPlanete});
      } catch (error){
        return res.status(400).send({error: error.message});
      }
    }else{
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  findAll: async function (req, res) {
    planete
      .findAll(req.params)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "No planetes created yet!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving planetes...",
        });
      });
  },

  // This function find and returns one registered user based on one parameter.

  findOne: async function (req, res) {
    const id = req.params.planete_id;
    planete
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (data) => {
        if (data) {
          res.status(200).send({
            message: `Successfully connected to your planete`,
          });
        } else {
          res.status(404).send({
            message: `Cannot find planete with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving planete with id=" + id,
        });
      });
  },

  // This function updates a user's information.

   update: async function (req, res) {
   // console.log(req)
    const id = req.params.planete_id;
    console.log(id);
     planete
       .findOne({
        where: {
          id: id,
         },
       })
       .then(async (response) => {
        // We update the book
             const {
              planete_id,
              planete_name,
              planete_description,
             } = req.body;
             const planeteUpdate = {
              planete_id,
              planete_name,
              planete_description,
             };
             response.update(planeteUpdate);
             res.send(response);
         }
       )
       .catch((err) => {
         res
           .status(404)
           .send("We were unable to update your planete because " + err);
       });
   },

};