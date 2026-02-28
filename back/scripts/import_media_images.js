const fs = require("fs");
const path = require("path");
const { DataTypes } = require("sequelize");

const sequelize = require("../src/models").sequelize;
const Media = require("../src/models/media")(sequelize, DataTypes);

const IMAGES_DIR = "/var/www/mus_storage/images";

function extToMime(ext) {
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    default:
      return null;
  }
}

async function main() {
  const entries = fs.readdirSync(IMAGES_DIR, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => e.name);

  let created = 0;
  let skipped = 0;

  for (const filename of files) {
    const ext = path.extname(filename).toLowerCase();
    const mime = extToMime(ext);
    if (!mime) {
      skipped++;
      continue;
    }

    const diskPath = path.join(IMAGES_DIR, filename);
    const stat = fs.statSync(diskPath);

    // évite doublons
    const exists = await Media.findOne({
      where: { filename, disk_path: diskPath },
    });
    if (exists) {
      skipped++;
      continue;
    }

    await Media.create({
      kind: "image",
      storage: "local",
      filename: filename,
      original_name: filename,
      disk_path: diskPath,
      mime_type: mime,
      size: stat.size,
      alt: null,
    });

    created++;
  }

  console.log(`Import terminé. Créés: ${created}, Ignorés: ${skipped}`);
  await sequelize.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
