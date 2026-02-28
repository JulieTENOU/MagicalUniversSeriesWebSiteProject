const express = require("express");
const router = express.Router();
const { crystals } = require("../controllers");
const  verifyToken  = require("../middleware/index");


router.post("/createCrystals", crystals.createCrystals);
router.get("/getOneCrystals/:Name_character", crystals.findOneCrystals);
// router.get("/findAllCharacters", characters.findAll);
router.put("/updateCrystals/:Name_character", crystals.updateOneCrystals);

module.exports = router;