const { DataTypes, Op } = require("sequelize");
const sequelize = require("../models").sequelize;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const users = require("../models/users")(sequelize, DataTypes);
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authKey");
const transporter = require("../../utils/mailer");
const serverError = require("../../utils/serverError.js");

async function sendResetEmail(to, resetLink) {
  await transporter.sendMail({
    from: `"Mels' Magical Univers Series Website" <${process.env.MAIL_USER}>`,
    to,
    subject: "Réinitialisation du mot de passe",
    html: `
      <p>Voici le lien pour réinitialiser ton mot de passe :</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Ce lien expire dans 1 heure.</p>
    `,
  });
}

module.exports = {
  create: async function (req, res) {
    if (!req.body) return res.status(400).json({ message: "No data provided." });
    try {
      let { users_pseudo, users_email, users_password, users_status } = req.body;

      const allowedStatuses = ["a", "p", "r"];
      if (!allowedStatuses.includes(users_status)) {
        return res.status(400).send({ message: "Invalid user status." });
      }

      users_password = bcrypt.hashSync(users_password, 12);

      const newUser = await users.create({
        users_pseudo,
        users_email,
        users_password,
        users_status,
      });
      return res.status(201).send({ newUser });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Cet email est déjà utilisé." });
      }
      return serverError(res, err);
    }
  },

  signIn: async function (req, res) {
    const INVALID_MSG = "Identifiant ou mot de passe incorrect.";
    try {
      const login = await users.findOne({
        where: { users_email: req.body.users_email },
      });

      if (!login) {
        return res.status(401).send({ message: INVALID_MSG });
      }

      const rightPassword = await bcrypt.compare(req.body.users_password, login.users_password);
      if (!rightPassword) {
        return res.status(401).send({ message: INVALID_MSG });
      }

      const token = jwt.sign(
        { users_email: login.users_email, id: login.users_ID },
        authConfig.secret,
        { expiresIn: "24h" }
      );

      req.session.token = token;

      return res.status(200).send({
        login: {
          users_ID: login.users_ID,
          users_pseudo: login.users_pseudo,
          users_email: login.users_email,
          users_status: login.users_status,
        },
      });
    } catch (err) {
      return serverError(res, err);
    }
  },

  updatePassword: async function (req, res) {
    try {
      const { old_password, new_password } = req.body;
      if (!old_password || !new_password) {
        return res.status(400).send({ message: "Données manquantes." });
      }

      const user = await users.findOne({ where: { users_ID: req.userId } });
      if (!user) {
        return res.status(404).send({ message: "Utilisateur inconnu." });
      }

      const ok = await bcrypt.compare(old_password, user.users_password);
      if (!ok) {
        return res.status(401).send({ message: "Mot de passe actuel incorrect." });
      }

      await user.update({ users_password: bcrypt.hashSync(new_password, 12) });
      return res.status(200).send({ message: "Mot de passe mis à jour." });
    } catch (err) {
      return serverError(res, err);
    }
  },

  forgotPassword: async function (req, res) {
    if (!req.body?.users_email) {
      return res.status(400).json({ message: "Email manquant." });
    }
    try {
      const user = await users.findOne({
        where: { users_email: req.body.users_email },
      });

      const okMessage = "Si cet email existe dans notre base, un lien de réinitialisation a été envoyé.";
      if (!user) return res.status(200).send({ message: okMessage });

      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000);

      await user.update({
        users_reset_token: resetToken,
        users_reset_expires: resetExpires,
      });

      const baseUrl = process.env.APP_URL || "http://localhost:3000";
      const resetLink = `${baseUrl}/reset-password/${resetToken}`;
      await sendResetEmail(user.users_email, resetLink);

      return res.status(200).send({ message: okMessage });
    } catch (err) {
      return serverError(res, err);
    }
  },

  resetPassword: async function (req, res) {
    const { token } = req.params;
    const { users_password } = req.body;

    if (!token || !users_password) {
      return res.status(400).send({ message: "Token ou nouveau mot de passe manquant." });
    }

    try {
      const user = await users.findOne({
        where: {
          users_reset_token: token,
          users_reset_expires: { [Op.gt]: new Date() },
        },
      });

      if (!user) {
        return res.status(400).send({ message: "Token invalide ou expiré." });
      }

      await user.update({
        users_password: bcrypt.hashSync(users_password, 12),
        users_reset_token: null,
        users_reset_expires: null,
      });

      return res.send({ message: "Mot de passe réinitialisé !" });
    } catch (err) {
      return serverError(res, err);
    }
  },

  logout: async function (req, res) {
    try {
      req.session = null;
      res.clearCookie("MAGame-session");
      return res.status(200).send({ message: "Logged out successfully." });
    } catch (err) {
      return serverError(res, err);
    }
  },
};
