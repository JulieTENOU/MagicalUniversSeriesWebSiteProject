const express = require('express');
const router = express.Router();
const { bonus_carac } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createBonusCarac", bonus_carac.create);
router.get("/api/getOneBonusCarac", bonus_carac.findOne);
router.get("/findAllBonusCarac", bonus_carac.findAll);
router.put("/api/updateBonusCarac/:bonus_id", bonus_carac.update);
module.exports = router;