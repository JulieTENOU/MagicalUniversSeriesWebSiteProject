const express = require('express');
const router = express.Router();
const { bonus_energies } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createBonusEnergy", bonus_energies.create);
router.get("/api/getOneBonusEnergy", bonus_energies.findOne);
router.get("/findAllBonusEnergies", bonus_energies.findAll);
router.put("/api/updateBonusEnergy/:id", bonus_energies.update);
module.exports = router;