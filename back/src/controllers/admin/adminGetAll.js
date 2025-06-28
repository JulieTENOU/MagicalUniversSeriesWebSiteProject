const { DataTypes } = require("sequelize");
const sequelize = require("../../models").sequelize;
const characters = require("../../models/characters")(sequelize, DataTypes);

module.exports = {
    getAllCharacters: async function (req, res){
        characters
            .findAll()
            .then((response) => {
                res.status(200).send(response);
            })
            .catch((err) => {
                res.status(400).send({message: err});
            });
    },
}