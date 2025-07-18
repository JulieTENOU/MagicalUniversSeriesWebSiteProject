const express = require('express');
const router = express.Router();
const { competences } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createComp", competences.create);
router.get("/api/getOneComp", competences.findOne);
router.get("/findAllComp", competences .findAll);
router.put("/api/updateComp/:id", competences.update);
module.exports = router;