const { DataTypes } = require("sequelize");
// const {id} = require("./authService");
const sequelize = require("../models").sequelize;
const crystals = require("../models/crystals")(sequelize, DataTypes);

module.exports = {  
  createCrystals: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
        crystal_verre,
        crystal_plasma,
        crystal_eau,
        lapis,
        diams_violet,
        diams_vert,
        diams_turquoise,
        diams_carmin,
        diams_ocre,
        bille_arc,
        crystal_ange,
        crystal_dem,
        crystal_liquide,
        pierre_lune,
        crystal_feu,
        crystal_or,
        crystal_ID,
        crystals_name_character,
        } = req.body;
        const newCrystals = await crystals.create({
          crystal_verre,
          crystal_plasma,
          crystal_eau,
          lapis,
          diams_violet,
          diams_vert,
          diams_turquoise,
          diams_carmin,
          diams_ocre,
          bille_arc,
          crystal_ange,
          crystal_dem,
          crystal_liquide,
          pierre_lune,
          crystal_feu,
          crystal_or,
          crystal_ID,
          crystals_name_character,
        });
        return res.status(201).send({newCrystals});
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

  findOneCrystals: async function (req, res) {
    const character=req.params.Name_character
    console.log("Name_character:"+character)
    crystals
      .findOne({
        where: {
          crystals_name_character: character,
        },
      })
      .then(async (data) => {
        console.log(data)
        if (data) {
          console.log('Success');
          res.status(200).send({
            message: `Successfully connected to your crystals list`,
            data
          });
        } else {
          console.log("find one crystals Error 404");
          res.status(404).send({
            message: `Cannot find your crystals list.`,
          });
        }
      })
      .catch((err) => {
        console.log("Error Server 500");
        console.log(err);
        res.status(500).send({
          message: `Error retrieving your crystals list`,
        });
      });
  },


  updateOneCrystals: async function (req, res){
   const character = req.params.Name_character;
   console.log("Name_character:" + character)
   crystals
   .findOne({
    where: {
      crystals_name_character: character,
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
