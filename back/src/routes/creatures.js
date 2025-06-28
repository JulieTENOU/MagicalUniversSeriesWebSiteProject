const express = require("express");
const router = express.Router();
const { creatures } = require("../controllers");
const  verifyToken  = require("../middleware/index");


router.post("/createCreatures", creatures.createCreatures);
router.get("/api/getOneCreatures/:Name_character", creatures.findOneCreatures);
// router.get("/findAllCharacters", characters.findAll);
router.put("/api/updateCreatures/:Name_character", creatures.updateOneCreatures);

module.exports = router;