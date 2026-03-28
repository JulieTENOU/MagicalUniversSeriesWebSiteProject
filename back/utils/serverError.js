module.exports = function serverError(res, err) {
  console.error(err);
  const detail =
    process.env.NODE_ENV === "production" ? "Erreur interne du serveur." : err.message;
  return res.status(500).json({ error: detail });
};
