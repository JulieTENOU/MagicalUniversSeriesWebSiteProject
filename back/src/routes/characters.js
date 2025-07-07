const express = require("express");
const router = express.Router();
const { characters } = require("../controllers");
const  verifyToken  = require("../middleware/index");


router.post("/createCharacter", characters.create);
router.get("/api/getOneCharacter/:Name_character", characters.findOneCharacter);
router.get("/getAllCharacters", characters.findAll);
router.put("/api/updateCharacter/:Name_character", characters.updateOneCharacter);
router.get("/api/getOneCharacterById/:ID_character", characters.findOneCharacterById);

// router.get("/findAllCharacters", characters.findAll);

module.exports = router;