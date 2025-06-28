const express = require("express");
const router = express.Router();
const { currentGauges } = require("../controllers");
const  verifyToken  = require("../middleware/index");


router.post("/createCurrentGauges", currentGauges.create);
router.get("/api/getOneGauges/:Name_character", currentGauges.findOneGauges);
router.get("/findAll", currentGauges.findAll);
router.put("/api/updateGauges/:Name_character", currentGauges.updateOneGauges);

module.exports = router;