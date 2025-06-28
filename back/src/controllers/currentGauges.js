const { DataTypes } = require("sequelize");
// const {id} = require("./authService");
const sequelize = require("../models").sequelize;
const currentGauges = require("../models/currentGauges")(sequelize, DataTypes);

module.exports = {  
  create: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          currentManaVital,
          currentManaEau,
          currentManaTerre,
          currentManaAir,
          currentManaFeu,
          currentManaVolonte,
          currentStamina,
          currentGauges_ID,
          Name_character,
        } = req.body;
        const newGauges = await currentGauges.create({
          currentManaVital,
          currentManaEau,
          currentManaTerre,
          currentManaAir,
          currentManaFeu,
          currentManaVolonte,
          currentStamina,
          currentGauges_ID,
          Name_character,
        });
        return res.status(201).send({newGauges});
      } catch (error){
        return res.status(400).send({error: error.message});
      }
    }else{
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

   findAll: async function (req, res) {
     currentGauges
       .findAll(req.params)
       .then((data) => {
         if (data) {
           res.send(data);
         } else {
           res.status(404).send({
             message: "There isn't any account registered yet!",
           });
         }
       })
       .catch((err) => {
         res.status(500).send({
           message: "Error retrieving accounts...",
         });
       });
   },

  // This function find and returns one registered user based on one parameter.

  findOneGauges: async function (req, res) {
    const character=req.params.Name_character
    console.log("Name_character:"+character)
    currentGauges
      .findOne({
        where: {
          Name_character: character,
        },
      })
      .then(async (data) => {
        console.log(data)
        if (data) {
          console.log('Success');
          res.status(200).send({
            message: `Successfully connected to your profile`,
            data
          });
        } else {
          console.log("current gauges Error 404");
          res.status(404).send({
            message: `Cannot find your character.`,
          });
        }
      })
      .catch((err) => {
        console.log("Error Server 500");
        console.log(err);
        res.status(500).send({
          message: `Error retrieving your character`,
        });
      });
  },

  updateOneGauges: async function (req, res){
    const character=req.params.Name_character
    console.log("Name_character:"+character)
    currentGauges
    .findOne({
      where: {
        Name_character: character,
      },
    })
      .then((response) => {
       response.update(req.body);
       res.status(201).json(response);
      })
      .catch((err) => {
       res
         .status(404)
         .send("Mise à jour de l'inventaire impossible :" + err)
      });
   }
};