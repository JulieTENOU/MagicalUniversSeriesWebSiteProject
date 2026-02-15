const express = require("express");
const router = express.Router();
const { series } = require("../controllers");
const verifyToken = require("../middleware/index");

router.post("/createSerie", series.create);
router.get("/api/getOneSerie", series.findOne);
router.get("/findAllSeries", series.findAll);
router.put("/api/updateSeries/:ID_series", series.update);
module.exports = router;
