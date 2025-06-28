const { DataTypes } = require("sequelize");
// const {id} = require("./authService");
const sequelize = require("../models").sequelize;
const inventories = require("../models/inventories")(sequelize, DataTypes);

module.exports = {  
  createInventory: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
        inventory_ID,
        inventory_name_character,
        arme1Name,
        arme1Damage,
        arme1Scope,
        arme1Ammunition,
        arme2Name,
        arme2Damage,
        arme2Scope,
        arme2Ammunition,
        arme3Name,
        arme3Damage,
        arme3Scope,
        arme3Ammunition,
        armure1Name,
        armure1Cac,
        armure1Dist,
        armure1Effect,
        armure2Name,
        armure2Cac,
        armure2Dist,
        armure2Effect,
        armure3Name,
        armure3Cac,
        armure3Dist,
        armure3Effect,
        important1,
        important2,
        important3,
        important4,
        important5,
        divers1_inventory,
        divers2_inventory,
        divers3_inventory,
        divers4_inventory,
        divers5_inventory,
        divers6_inventory,
        divers7_inventory,
        divers8_inventory,
        divers9_inventory,
        divers10_inventory,
        divers1Quantite,
        divers2Quantite,
        divers3Quantite,
        divers4Quantite,
        divers5Quantite,
        divers6Quantite,
        divers7Quantite,
        divers8Quantite,
        divers9Quantite,
        divers10Quantite,
        repas_inventory,
        autres_inventory,
        PPU,
        POU,
        PAU,

        } = req.body;
        const newInventory = await inventories.create({
          inventory_ID,
          inventory_name_character,
          arme1Name,
          arme1Damage,
          arme1Scope,
          arme1Ammunition,
          arme2Name,
          arme2Damage,
          arme2Scope,
          arme2Ammunition,
          arme3Name,
          arme3Damage,
          arme3Scope,
          arme3Ammunition,
          armure1Name,
          armure1Cac,
          armure1Dist,
          armure1Effect,
          armure2Name,
          armure2Cac,
          armure2Dist,
          armure2Effect,
          armure3Name,
          armure3Cac,
          armure3Dist,
          armure3Effect,
          important1,
          important2,
          important3,
          important4,
          important5,
          divers1_inventory,
          divers2_inventory,
          divers3_inventory,
          divers4_inventory,
          divers5_inventory,
          divers6_inventory,
          divers7_inventory,
          divers8_inventory,
          divers9_inventory,
          divers10_inventory,
          divers1Quantite,
          divers2Quantite,
          divers3Quantite,
          divers4Quantite,
          divers5Quantite,
          divers6Quantite,
          divers7Quantite,
          divers8Quantite,
          divers9Quantite,
          divers10Quantite,
          repas_inventory,
          autres_inventory,
          PPU,
          POU,
          PAU
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

  findOneInventory: async function (req, res) {
    const character=req.params.Name_character
    console.log("Name_character:"+character)
    inventories
      .findOne({
        where: {
          inventory_name_character: character,
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
          console.log("find one inventories Error 404");
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


  updateOneInventory: async function (req, res){
   const character = req.params.Name_character;
   console.log("Name_character:" + character)
   inventories
   .findOne({
    where: {
      inventory_name_character: character,
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
