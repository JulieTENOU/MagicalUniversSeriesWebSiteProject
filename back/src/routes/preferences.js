const express = require("express");
const router = express.Router();
const userPreferences = require("../controllers/preferences");
const { verifyToken } = require("../middleware/verifyToken");


// GET préférences
router.get("/", verifyToken, userPreferences.get);

// POST préférences
router.post("/", verifyToken, userPreferences.save);

module.exports = router;
