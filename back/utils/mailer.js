require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = transporter;

transporter.verify(function(error, success) {
  if (error) {
    console.log("Erreur nodemailer:", error);
  } else {
    console.log("Serveur mail prêt !");
  }
});
