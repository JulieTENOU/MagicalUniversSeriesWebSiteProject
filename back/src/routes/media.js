const express = require("express");
const router = express.Router();
const { media } = require("../controllers");
const uploadImage = require("../middleware/uploadImage");
const { verifyToken } = require("../middleware");

const authOptional = require("../middleware/authOptional");

// Exemple : GET /media/getOneMedia/1
router.get("/getOneMedia/:ID_media", authOptional, media.getOne);

router.post(
  "/upload",
  verifyToken,
  uploadImage.single("file"),
  media.uploadOne,
);

router.delete("/:ID_media", verifyToken, media.deleteOne);

module.exports = router;
