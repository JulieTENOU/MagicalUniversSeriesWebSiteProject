const express = require('express');
const router = express.Router();
const { planete } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createPlanete", planete.create);
router.get("/api/getOnePlanete", planete.findOne);
router.get("/findAllPlanete", planete.findAll);
router.put("/api/updatePlanete/:planete_id", planete.update);
module.exports = router;