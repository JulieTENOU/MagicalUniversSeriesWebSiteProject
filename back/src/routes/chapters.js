const express = require('express');
const router = express.Router();
const { chapters } = require("../controllers");
const  verifyToken  = require("../middleware/index");

router.post("/createChapter", chapters.create);
router.get("/api/getOneChapter", chapters.findOne);
router.get("/findAllChapters", chapters.findAll);
router.put("/api/updateChapter/:ID_chapter", chapters.update);
module.exports = router;