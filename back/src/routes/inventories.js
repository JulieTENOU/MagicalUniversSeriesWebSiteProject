const express = require("express");
const router = express.Router();
const { inventories } = require("../controllers");
const  verifyToken  = require("../middleware/index");


router.post("/createInventories", inventories.createInventory);
router.get("/getOneInventories/:Name_character", inventories.findOneInventory);
// router.get("/findAllCharacters", characters.findAll);
router.put("/updateInventory/:Name_character", inventories.updateOneInventory);

module.exports = router;