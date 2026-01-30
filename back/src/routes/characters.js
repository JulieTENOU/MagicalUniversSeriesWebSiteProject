const express = require("express");
const router = express.Router();
const { characters } = require("../controllers");
const { verifyToken } = require("../middleware/index");

router.post("/createCharacter", verifyToken, characters.create);
router.get("/getOneCharacter/:Name_character", characters.findOneCharacter);
router.get("/getAllCharacters", characters.findAll);
router.put("/updateCharacter/:ID_character", characters.updateOneCharacter);
router.get(
  "/getOneCharacterById/:ID_character",
  characters.findOneCharacterById,
);

router.post(
  "/adminCreateCharacter_TEMP",
  verifyToken,
  characters.adminCreateCharacter_TEMP,
);

// router.get("/findAllCharacters", characters.findAll);

module.exports = router;
