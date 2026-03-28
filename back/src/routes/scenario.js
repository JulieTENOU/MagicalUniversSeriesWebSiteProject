// routes/scenario.js
const router = require("express").Router();
const { scenarioEnd } = require("../controllers");
const { verifyToken } = require("../middleware");

router.post("/start",     verifyToken, scenarioEnd.startScenario);
router.get("/snapshots",  verifyToken, scenarioEnd.getSnapshots);
router.post("/end",       verifyToken, scenarioEnd.endScenario);

module.exports = router;
