const { DataTypes } = require("sequelize");
// const {id} = require("./authService");
const sequelize = require("../models").sequelize;
const characters = require("../models/characters")(sequelize, DataTypes);

module.exports = {  
  create: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          ID_character,
         Name_character,
         Age_character,
         OeilD_character,
         OeilG_character,
         Taille_character,
         Poids_character,
         Sexe_character,
         Planete_character,
         Agence_character,
         Cheveux_character,
         Race_character,
         Metier_character,
         Niveau_character,
         Signes_character,
         Traits_character,
         ManaVital_character,
         ManaEau_character,
         ManaTerre_character,
         ManaAir_character,
         ManaFeu_character,
         ManaVolonte_character,
         Stamina_character,
         HasDraconiqueHeart,
         HasCeleste,
         Force_character,
         Dexte_character,
         Resistance_character,
         Resilience_character,
         Intell_character,
         Charisme_character,
         Chance_character,
         Bien_character,
         Mal_character,
         Demonique_character,
         Draconique_character,
         Xalytien_character,
         Xento_character,
         Zenolm_character,
         Justiccel_character,
         Cerebrov_character,
         Spectrale_character,
         Astrale_character,
         XalytienArchaique_character,
         XalytienAntique_character,
         XalytienDemonique_character,
         XentoArchaique_character,
         XentoAntique_character,
         XentoDemonique_character,
         ZenolmArchaique_character,
         ZenolmAntique_character,
         ZenolmDemonique_character,
         JusticcelArchaique_character,
         JusticcelAntique_character,
         JusticcelDemonique_character,
         Zombique_character,
         Faerik_character,
         Elfik_character,
         Nanien_character,
         Gnomique_character,
         Tenebriale_character,
         Noyale_character,
         Elementale_character,
         Celeste_character,
         Arcs_character,
         Tir_character,
         ArmesHast_character,
         MainsNues_character,
         Jets_character,
         Tranchantes_character,
         Contondantes_character,
         Esquive_character,
         Parade_character,
         Chant_character,
         Chasse_character,
         Course_character,
         Crochetage_character,
         Discretion_character,
         Deguisement_character,
         Eloquance_character,
         Escalade_character,
         Equitation_character,
         Herboristerie_character,
         Hypnose_character,
         Medecine_character,
         Nage_character,
         Obersvation_character,
         Pieges_character,
         Professorat_character,
         Saut_character,
         Soin_character,
         Survie_character,
         Telekinesie_character,
         Vigilence_character,
         MagicoTech_character,
         Cartographie_character,
         Potions_character,
         TheorieMagique_character,
         HistoireMagique_character,
         MagieAir_character,
         MagieEau_character,
         MagieFeu_character,
         MagieTerre_character,
         MagieElec_character,
         Crea_character,
         PsyInt_character,
         Instinct_character,
         Invoc_character,
         Aura_character,
         MagieVie_character,
         Temps_character,
         Mort_character,
         PsyExt_character,
         PsyInterperso_character,
         Lumière_character,
         MagieAstrale_character,
         MagieSpectrale_character,
         Cosmos_character,
         Tenebres_character,
         MagieDraconique_character,
         users_ID,
         character_path,

        } = req.body;
        const newCharacter = await characters.create({
          ID_character,
          Name_character,
          Age_character,
          OeilD_character,
          OeilG_character,
          Taille_character,
          Poids_character,
          Sexe_character,
          Planete_character,
          Agence_character,
          Cheveux_character,
          Race_character,
          Metier_character,
          Niveau_character,
          Signes_character,
          Traits_character,
          ManaVital_character,
          ManaEau_character,
          ManaTerre_character,
          ManaAir_character,
          ManaFeu_character,
          ManaVolonte_character,
          Stamina_character,
          HasDraconiqueHeart,
          HasCeleste,
          Force_character,
          Dexte_character,
          Resistance_character,
          Resilience_character,
          Intell_character,
          Charisme_character,
          Chance_character,
          Bien_character,
          Mal_character,
          Demonique_character,
          Draconique_character,
          Xalytien_character,
          Xento_character,
          Zenolm_character,
          Justiccel_character,
          Cerebrov_character,
          Spectrale_character,
          Astrale_character,
          XalytienArchaique_character,
          XalytienAntique_character,
          XalytienDemonique_character,
          XentoArchaique_character,
          XentoAntique_character,
          XentoDemonique_character,
          ZenolmArchaique_character,
          ZenolmAntique_character,
          ZenolmDemonique_character,
          JusticcelArchaique_character,
          JusticcelAntique_character,
          JusticcelDemonique_character,
          Zombique_character,
          Faerik_character,
          Elfik_character,
          Nanien_character,
          Gnomique_character,
          Tenebriale_character,
          Noyale_character,
          Elementale_character,
          Celeste_character,
          Arcs_character,
          Tir_character,
          ArmesHast_character,
          MainsNues_character,
          Jets_character,
          Tranchantes_character,
          Contondantes_character,
          Esquive_character,
          Parade_character,
          Chant_character,
          Chasse_character,
          Course_character,
          Crochetage_character,
          Discretion_character,
          Deguisement_character,
          Eloquance_character,
          Escalade_character,
          Equitation_character,
          Herboristerie_character,
          Hypnose_character,
          Medecine_character,
          Nage_character,
          Obersvation_character,
          Pieges_character,
          Professorat_character,
          Saut_character,
          Soin_character,
          Survie_character,
          Telekinesie_character,
          Vigilence_character,
          MagicoTech_character,
          Cartographie_character,
          Potions_character,
          TheorieMagique_character,
          HistoireMagique_character,
          MagieAir_character,
          MagieEau_character,
          MagieFeu_character,
          MagieTerre_character,
          MagieElec_character,
          Crea_character,
          PsyInt_character,
         Instinct_character,
         Invoc_character,
          Aura_character,
          MagieVie_character,
          Temps_character,
          Mort_character,
          PsyExt_character,
          PsyInterperso_character,
          Lumière_character,
          MagieAstrale_character,
          MagieSpectrale_character,
          Cosmos_character,
          Tenebres_character,
          MagieDraconique_character,
          users_ID,
          character_path,
        });
        return res.status(201).send({newCharacter});
      } catch (error){
        return res.status(400).send({error: error.message});
      }
    }else{
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

   findAll: async function (req, res) {
     characters
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
  console.error("FINDALL ERROR:", err);
  res.status(500).send({
    message: "Error retrieving accounts...",
    error: err.message, // Ajoute ça pour voir l’erreur réelle !
  });
});
   },

  // This function find and returns one registered user based on one parameter.

  findOneCharacter: async function (req, res) {
    const character=req.params.Name_character
    console.log("Name_character:"+character)
    characters
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
          console.log("find one character Error 404");
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

  findOneCharacterById: async function (req, res) {
  const id = req.params.ID_character;
  characters
    .findOne({ where: { ID_character: id } })
    .then((data) => {
      if (data) res.status(200).send({ message: "Character found", data });
      else res.status(404).send({ message: "No character found with this id." });
    })
    .catch((err) => res.status(500).send({ message: "Error retrieving character.", err }));
},

  updateOneCharacter: async function (req, res){
    const character = req.params.Name_character;
    console.log("Name_character:" + character)
    characters
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
         .send("Mise à jour du perso impossible :" + err)
      });
   }
};