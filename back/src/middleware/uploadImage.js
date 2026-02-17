const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const AVATAR_DIR = "/var/www/mus_storage/images/user_avatars/";
const GALLERY_DIR = "/var/www/mus_storage/images/user_gallery/";

function pickDir(req) {
  const zone = String(req.query.zone || "gallery").toLowerCase();
  if (zone === "avatar") return AVATAR_DIR;
  return GALLERY_DIR;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, pickDir(req)),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, crypto.randomUUID() + ext);
  },
});

const uploadImage = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ["image/png", "image/jpeg", "image/webp", "image/gif"].includes(
      file.mimetype,
    );
    cb(ok ? null : new Error("Type de fichier non autorisé"), ok);
  },
});

module.exports = uploadImage;
