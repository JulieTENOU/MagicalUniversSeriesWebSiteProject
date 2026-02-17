// routes/scenario.js
const router = require("express").Router();
const { scenarioEnd } = require("../controllers");
const { verifyToken } = require("../middleware");

router.post("/end", verifyToken, scenarioEnd.endScenario);

module.exports = router;
