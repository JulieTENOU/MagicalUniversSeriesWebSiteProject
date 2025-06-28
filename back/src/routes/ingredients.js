const express = require("express");
const router = express.Router();
const { ingredients } = require("../controllers");
const  verifyToken  = require("../middleware/index");


router.post("/createIngredients", ingredients.createIngredients);
router.get("/api/getOneIngredients/:Name_character", ingredients.findOneIngredients);
// router.get("/findAllCharacters", characters.findAll);
router.put("/api/updateIngredients/:Name_character", ingredients.updateOneIngredients);

module.exports = router;