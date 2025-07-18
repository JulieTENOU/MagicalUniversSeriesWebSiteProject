const express = require('express');
const router = express.Router();
const { energies } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createEnergy", energies.create);
router.get("/api/getOneEnergy", energies.findOne);
router.get("/findAllEnergies", energies.findAll);
router.put("/api/updateRace/:id", energies.update);
module.exports = router;