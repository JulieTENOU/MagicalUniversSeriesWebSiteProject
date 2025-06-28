const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const bcrypt = require("bcrypt");
const users = require("../models/users")(sequelize, DataTypes);

module.exports = {  
  create: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          users_ID,
         users_pseudo,
          users_email,
          users_password,
          users_status,
        } = req.body;
        users_password = bcrypt.hashSync(users_password, 8);
        const newUser = await users.create({
          users_ID,
          users_pseudo,
           users_email,
           users_password,
           users_status,
        });
        return res.status(201).send({newUser});
      } catch (error){
        return res.status(400).send({error: error.message});
      }
    }else{
      res.status(500).json(response);
    }
  },

  // This function find and returns all the users registered.

  findAll: async function (req, res) {
    users
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

  findOne: async function (req, res) {
    const email = req.user;
    users
      .findOne({
        where: {
          users_email: email,
        },
      })
      .then(async (data) => {
        if (data) {
          res.status(200).send({
            message: `Successfully connected to your profile`,
          });
        } else {
          res.status(404).send({
            message: `Cannot find account with email=${email}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving account with email=" + email,
        });
      });
  },

  // This function updates a user's information.

   update: async function (req, res) {
   // console.log(req)
    const id = req.params.users_ID;
    console.log(id);
     users
       .findOne({
        where: {
          users_ID: id,
         },
       })
       .then(async (response) => {
        // We update the user and it's preferences
         
           if (req.body.users_password && req.body.users_password !== "******") {
             req.body.users_password = bcrypt.hashSync(req.body.users_password, 8);
             const {
              users_ID,
          users_pseudo,
           users_email,
           users_password,
           users_status,
             } = req.body;
             const userUpdate = {
              users_ID,
          users_pseudo,
           users_email,
           users_password,
           users_status,
             };
             response.update(userUpdate);
             res.send(response);
           } else {
             delete req.body.users_password;
            const {
              users_ID,
              users_pseudo,
               users_email,
               users_password,
               users_status,
             } = req.body;
             const userUpdate = {
              users_ID,
          users_pseudo,
           users_email,
           users_password,
           users_status,
             };
             response.update(userUpdate);
             res.send(response);
         
         }
       })
       .catch((err) => {
         res
           .status(404)
           .send("We were unable to update your profile because " + err);
       });
   },

  // This function deletes a user.

  // delete: async function (req, res) {
  //   const email = req.user;
  //   users
  //     .findOne({
  //       where: {
  //         userEmail: email,
  //       },
  //     })
  //     .then((response) => {
  //       response.destroy();
  //       res.send("Profil has been deleted succesfully!");
  //     })
  //     .catch((err) => {
  //       res
  //         .status(404)
  //         .send(
  //           "We were unable to delete your profil. Please feel free to retry! Justification: " +
  //             err
  //         );
  //     });
  // },
};