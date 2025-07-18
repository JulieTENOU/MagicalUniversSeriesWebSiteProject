const express = require('express');
const router = express.Router();
const { metiers } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createJob", metiers.create);
router.get("/api/getOneJob", metiers.findOne);
router.get("/findAllJobs", metiers.findAll);
router.put("/api/updateJob/:metier_id", metiers.update);
module.exports = router;