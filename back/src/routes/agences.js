const express = require('express');
const router = express.Router();
const { agences } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createAgence", agences.create);
router.get("/api/getOneAgence", agences.findOne);
router.get("/findAllAgences", agences.findAll);
router.put("/api/updateAgence/:agence_id", agences.update);
module.exports = router;