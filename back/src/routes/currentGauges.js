const express = require("express");
const router = express.Router();
const { currentGauges } = require("../controllers");
const  verifyToken  = require("../middleware/index");


router.post("/createCurrentGauges", currentGauges.create);
router.get("/getOneGauges/:Name_character", currentGauges.findOneGauges);
router.get("/findAll", currentGauges.findAll);
router.put("/updateGauges/:Name_character", currentGauges.updateOneGauges);

module.exports = router;