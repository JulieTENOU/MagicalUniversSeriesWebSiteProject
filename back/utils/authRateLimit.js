const failStore = new Map();

const BASE_BLOCK_MS = 60 * 1000; // 1 minute
const INITIAL_MAX_FAILS = 5;

// Nettoyage mémoire toutes les 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, state] of failStore.entries()) {
    if (state.blockedUntil < now && state.fails === 0 && state.blockCount === 0) {
      failStore.delete(ip);
    }
  }
}, 10 * 60 * 1000);

module.exports = function authRateLimit(req, res, next) {
  const ip = (req.socket.remoteAddress || "").replace(/^::ffff:/, "");
  const now = Date.now();
  const state = failStore.get(ip) || { fails: 0, blockCount: 0, blockedUntil: 0 };

  // IP actuellement bloquée ?
  if (state.blockedUntil > now) {
    const secondsLeft = Math.ceil((state.blockedUntil - now) / 1000);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const timeStr = minutes > 0
      ? `${minutes} minute${minutes > 1 ? "s" : ""} et ${seconds}s`
      : `${secondsLeft} secondes`;
    return res.status(429).json({
      message: `Trop de tentatives. Réessayez dans ${timeStr}.`,
    });
  }

  res.on("finish", () => {
    const current = failStore.get(ip) || { fails: 0, blockCount: 0, blockedUntil: 0 };

    if (res.statusCode === 401) {
      current.fails = (current.fails || 0) + 1;
      // Après le 1er blocage, le moindre échec déclenche un nouveau blocage
      const maxFails = current.blockCount === 0 ? INITIAL_MAX_FAILS : 1;
      if (current.fails >= maxFails) {
        current.blockCount = (current.blockCount || 0) + 1;
        current.blockedUntil = Date.now() + BASE_BLOCK_MS * Math.pow(2, current.blockCount - 1);
        current.fails = 0;
      }
      failStore.set(ip, current);
    } else if (res.statusCode === 200) {
      failStore.delete(ip);
    }
  });

  next();
};
