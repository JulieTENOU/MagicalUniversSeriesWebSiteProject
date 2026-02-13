const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/index");
const awakening = require("../controllers/awakening");

router.post("/solve", verifyToken, awakening.solve);
router.get("/puzzle/:puzzle_key", verifyToken, awakening.getPuzzle);

module.exports = router;
