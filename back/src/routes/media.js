const express = require("express");
const router = express.Router();
const { media } = require("../controllers");

// Exemple : GET /media/getOneMedia/1
router.get("/getOneMedia/:ID_media", media.getOne);

module.exports = router;
