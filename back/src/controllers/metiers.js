const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const  metiers = require("../models/metiers")(sequelize, DataTypes);

module.exports = {  
  create: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          metier_id,
          metier_name,
          metier_description,
        } = req.body;
        
        const newJob = await metiers.create({
          metier_id,
          metier_name,
          metier_description,
        });
        return res.status(201).send({newJob});
      } catch (error){
        return res.status(400).send({error: error.message});
      }
    }else{
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  findAll: async function (req, res) {
    metiers
      .findAll(req.params)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "No jobs created yet!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error retrieving jobs...:  ${err}`,
        });
      });
  },

  // This function find and returns one registered user based on one parameter.

  findOne: async function (req, res) {
    const id = req.params.metier_id;
    metiers
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (data) => {
        if (data) {
          res.status(200).send({
            message: `Successfully connected to your job`,
          });
        } else {
          res.status(404).send({
            message: `Cannot find job with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving job with id=" + id,
        });
      });
  },

  // This function updates a user's information.

   update: async function (req, res) {
   // console.log(req)
    const id = req.params.metier_id;
    console.log(id);
     metiers
       .findOne({
        where: {
          id: id,
         },
       })
       .then(async (response) => {
        // We update the book
             const {
              metier_id,
              metier_name,
              metier_description,
             } = req.body;
             const jobUpdate = {
              metier_id,
              metier_name,
              metier_description,
             };
             response.update(jobUpdate);
             res.send(response);
         }
       )
       .catch((err) => {
         res
           .status(404)
           .send("We were unable to update your job because " + err);
       });
   },

};