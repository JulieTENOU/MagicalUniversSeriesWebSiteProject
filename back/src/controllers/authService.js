const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const bcrypt = require("bcrypt");
const users = require("../models/users")(sequelize, DataTypes);
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authKey");

module.exports = {
  //SIGN UP part

  //Create the newUser
  create: async function (req, res){
    console.log(req.body);
    if(req.body){
      try{
        let{
          users_pseudo,
          users_email,
          users_password,
          users_status,
        } = req.body;

        // Valeurs autorisées
        const allowedStatuses = ['a', 'p', 'r'];

        if (!allowedStatuses.includes(users_status)) {
          return res.status(400).send({ message: "Invalid user status." });
        }

        console.log({
          users_pseudo,
          users_email,
          users_password,
          users_status,
        });
        users_password = bcrypt.hashSync(users_password, 8);

        const newUser = await users.create({
          users_pseudo,
          users_email,
          users_password,
          users_status,
        });
        return res.status(201).send({ newUser});
      } catch (err){
        return res.status(400).send({err: err.message});
      }
    }else {
      res.status(400).json(response);
    }
  },

 // SIGN IN PART
signIn: async function (req, res) {
  console.log(req.body);
  try {
    const login = await users.findOne({
      where: {
        users_email: req.body.users_email,
      },
    });

    if (!login) {
      return res
        .status(404)
        .send({ message: "No profile matches this email address!" });
    }

    const rightPassword = await bcrypt
      .compare(req.body.users_password, login.users_password)
      .then(function (result) {
        return result === true;
      })
      .catch(function (err) {
        console.error("Erreur de comparaison bcrypt :", err);
        return false;
      });

    if (!rightPassword) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    // Mot de passe correct → générer un token et envoyer la réponse
    const token = await jwt.sign(
      { users_email: req.body.users_email,
        id: login.users_ID
       },
      authConfig.secret,
      { expiresIn: 3600 }
    );

    req.session.token = token;

    return res.status(200).send({ login, token });

  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
},


// Forgotten Password!
verifyEmail: async function (req, res) {
  if (req.body) {
    try {
      const login = await users.findOne({
        where: {
          users_email: req.body.users_email,
        },
      });
      if (!login) {
        return res.status(404).send(false);
      } else {
        return res.status(200).send(true);
      }
    } catch (err) {
      return res.status(400).send({ err: err.message });
    }
  } else {
    res.status(400).json({ message: "No data was provided." });
  }
},

// Update password
updatePassword: async function (req, res) {
  console.log(req.body);
  if (req.body) {
    users
      .findOne({
        where: {
          users_email: req.body.users_email,
        },
      })
      .then((response) => {
        if (!response) {
          return res.status(404).send({ message: "Invalid Email Address" });
        } else {
          req.body.users_password = bcrypt.hashSync(req.body.users_password, 8);
          response.update(req.body);
          res.send(true);
        }
      })
      .catch((err) => {
        return res.status(400).send({ err: err.message });
      });
  } else {
    res.status(400).json({ message: "No data was provided." });
  }
},

 logout: async function (req, res) {
  try {
    req.session = null; 
    res.clearCookie("MAGame-session");
    res.status(200).send({ message: "Logged out successfully." });
  } catch (err) {
    res.status(500).send({ message: "Logout failed", error: err });
  }
}


};