const { DataTypes } = require("sequelize");
// const {id} = require("./authService");
const sequelize = require("../models").sequelize;
const ingredients = require("../models/ingredients")(sequelize, DataTypes);

module.exports = {  
  createIngredients: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          ID_ingredients,
          ingredients_name_character,
          ingredient1,
          ingredient1Quantite,
          ingredient2,
          ingredient2Quantite,
          ingredient3,
          ingredient3Quantite,
          ingredient4,
          ingredient4Quantite,
          ingredient5,
          ingredient5Quantite,
          ingredient6,
          ingredient6Quantite,
          ingredient7,
          ingredient7Quantite,
          ingredient8,
          ingredient8Quantite,
          ingredient9,
          ingredient9Quantite,
          ingredient10,
          ingredient10Quantite,
          ingredient11,
          ingredient11Quantite,
          ingredient12,
          ingredient12Quantite,
          ingredient13,
          ingredient13Quantite,
          ingredient14,
          ingredient14Quantite,
          ingredient15,
          ingredient15Quantite

        } = req.body;
        const newInventory = await ingredients.create({
          ID_ingredients,
          ingredients_name_character,
          ingredient1,
          ingredient1Quantite,
          ingredient2,
          ingredient2Quantite,
          ingredient3,
          ingredient3Quantite,
          ingredient4,
          ingredient4Quantite,
          ingredient5,
          ingredient5Quantite,
          ingredient6,
          ingredient6Quantite,
          ingredient7,
          ingredient7Quantite,
          ingredient8,
          ingredient8Quantite,
          ingredient9,
          ingredient9Quantite,
          ingredient10,
          ingredient10Quantite,
          ingredient11,
          ingredient11Quantite,
          ingredient12,
          ingredient12Quantite,
          ingredient13,
          ingredient13Quantite,
          ingredient14,
          ingredient14Quantite,
          ingredient15,
          ingredient15Quantite
        });
        return res.status(201).send({newInventory});
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

  findOneIngredients: async function (req, res) {
    const character=req.params.Name_character
    console.log("Name_character:"+character)
    ingredients
      .findOne({
        where: {
          ingredients_name_character: character,
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
          console.log("find one ingredients Error 404");
          res.status(404).send({
            message: `Cannot find your inventory.`,
          });
        }
      })
      .catch((err) => {
        console.log("Error Server 500");
        console.log(err);
        res.status(500).send({
          message: `Error retrieving your inventory`,
        });
      });
  },


  updateOneIngredients: async function (req, res){
   const character = req.params.Name_character;
   console.log("Name_character:" + character)
   ingredients
   .findOne({
    where: {
      ingredients_name_character: character,
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
