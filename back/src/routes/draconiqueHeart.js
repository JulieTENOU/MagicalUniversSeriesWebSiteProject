const express = require("express");
const router = express.Router();
const { draconiqueHeart } = require("../controllers");
const  verifyToken  = require("../middleware/index");


router.post("/createDraconiqueHeart", draconiqueHeart.create);
router.get("/getOneDraconique/:Name_character", draconiqueHeart.findOneDraconique);
router.get("/findAll", draconiqueHeart.findAll);
router.put("/updateDraconique/:Name_character", draconiqueHeart.updateOneDraconique);

module.exports = router;