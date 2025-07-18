const express = require('express');
const router = express.Router();
const { races } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createRace", races.create);
router.get("/api/getOneRace", races.findOne);
router.get("/findAllRace", races.findAll);
router.put("/api/updateRace/:race_id", races.update);
module.exports = router;