const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware");

const characterMedia = require("../controllers/character_media");

router.post(
  "/characters/:ID_character/media",
  verifyToken,
  characterMedia.attach,
);
router.get(
  "/characters/:ID_character/media",
  verifyToken,
  characterMedia.listByCharacter,
);
router.delete(
  "/characters/:ID_character/media/:ID_character_media",
  verifyToken,
  characterMedia.detach,
);

module.exports = router;
