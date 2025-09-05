const { DataTypes } = require("sequelize");
// const {id} = require("./authService");
const sequelize = require("../models").sequelize;
const creatures = require("../models/creatures")(sequelize, DataTypes);

module.exports = {  
  createCreatures: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          ID_creatures,
          Name_character,
          creature1,
          creature2,
          creature3,
          creature4,
          creature5,
          creature6,
          creature7,
          creature8,
          creature9,
          creature10,
          creature11,
          creature12,
          creature13,
          creature14,
          creature15,

        } = req.body;
        const newCreatures = await creatures.create({
          ID_creatures,
          Name_character,
          creature1,
          creature2,
          creature3,
          creature4,
          creature5,
          creature6,
          creature7,
          creature8,
          creature9,
          creature10,
          creature11,
          creature12,
          creature13,
          creature14,
          creature15,
        });
        return res.status(201).send({newCreatures});
      } catch (error){
        return res.status(400).send({error: error.message});
      }
    }else{
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  // findAll: async function (req, res) {
  //   users
  //     .findAll(req.params)
  //     .then((data) => {
  //       if (data) {
  //         res.send(data);
  //       } else {
  //         res.status(404).send({
  //           message: "There isn't any account registered yet!",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: "Error retrieving accounts...",
  //       });
  //     });
  // },

  // This function find and returns one registered user based on one parameter.

  findOneCreatures: async function (req, res) {
    const character=req.params.Name_character
    console.log("Name_character:"+character)
    creatures
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
          console.log("find one creatures Error 404");
          res.status(404).send({
            message: `Cannot find your inventory.`,
          });
        }
      })
      .catch((err) => {
        console.log("Error Server 500");
        console.log(err);
        res.status(500).send({
          message: `Error retrieving your creatures.`,
        });
      });
  },


  updateOneCreatures: async function (req, res){
   const character = req.params.Name_character;
   console.log("Name_character:" + character)
   creatures
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
