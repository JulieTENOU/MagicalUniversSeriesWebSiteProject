const express = require("express");
const router = express.Router();
const { chapters } = require("../controllers");
const { verifyToken } = require("../middleware/index");

router.post("/createChapter", chapters.create);
router.get("/api/getOneChapter", chapters.findOne);
router.get("/findAllChapters", chapters.findAll);
router.put("/api/updateChapter/:ID_chapter", chapters.update);
// router.get("/getByPath/:path", chapters.getChapterByPath);
router.get(
  "/getByPath/:serie/:book/:chapter",
  verifyToken,
  chapters.getChapterByPath,
);

router.get(
  "/getAllByBookPath/:serie/:book",
  verifyToken,
  chapters.getChaptersByBookPath,
);

module.exports = router;
