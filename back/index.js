const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3333;
const Sequelize = require("sequelize");
const dbConfig = require("./src/config/db-config");
const http = require("http");
const { Server } = require("socket.io");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});

app.use(express.static(__dirname + "/public"));

// This is used to parse json post request in the body. It's essential to handle forms
app.use(express.json());
app.use(cors());

// We need body-Parser in order for this app to handle urlencoded POST requests properly
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// We need to set up the cookie requirement for the authenticated token
const authConfig = require("./src/config/authKey");
const cookieSession = require("cookie-session");

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "MAGame-session",
    secret: authConfig.secret,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: false,
  }),
);

app.use((req, _res, next) => {
  console.log("SESSION:", {
    url: req.method + " " + req.originalUrl,
    hasCookieHeader: !!req.headers.cookie,
    sessionKeys: req.session ? Object.keys(req.session) : null,
  });
  next();
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

// This is the app requireing the route that will receive the http request and interact with the controller
const user = require("./src/routes/user");
const books = require("./src/routes/books");
const chapters = require("./src/routes/chapters");
const book_parts = require("./src/routes/book_parts");
const series = require("./src/routes/series");
const authService = require("./src/routes/authService");
const characters = require("./src/routes/characters");
const inventories = require("./src/routes/inventories");
const ingredients = require("./src/routes/ingredients");
const crystals = require("./src/routes/crystals");
const creatures = require("./src/routes/creatures");
const currentGauges = require("./src/routes/currentGauges");
const draconiqueHeart = require("./src/routes/draconiqueHeart");
const preferences = require("./src/routes/preferences");
const competences = require("./src/routes/competences");
const races = require("./src/routes/races");
const planete = require("./src/routes/planete");
const metiers = require("./src/routes/metiers");
const energies = require("./src/routes/energies");
const bonus_carac = require("./src/routes/bonus_carac");
const bonus_energies = require("./src/routes/bonus_energies");
const agences = require("./src/routes/agences");
const awakening = require("./src/routes/awakening");
const media = require("./src/routes/media");
const character_media = require("./src/routes/character_media");
const scenario = require("./src/routes/scenario");

// This actually calls the route!
app.use("/users", user);
app.use("/chapters", chapters);
app.use("/books", books);
app.use("/series", series);
app.use("/book_parts", book_parts);
app.use("/api/characters", characters);
app.use("/api/inventories", inventories);
app.use("/api/ingredients", ingredients);
app.use("/api/crystals", crystals);
app.use("/api/creatures", creatures);
app.use("/api/gauges", currentGauges);
app.use("/api", authService);
app.use("/api/draconiqueHeart", draconiqueHeart);
app.use("/api/preferences", preferences);
app.use("/api/competences", competences);
app.use("/api/races", races);
app.use("/api/planete", planete);
app.use("/api/metiers", metiers);
app.use("/api/energies", energies);
app.use("/api/bonus_carac", bonus_carac);
app.use("/api/bonus_energies", bonus_energies);
app.use("/api/agences", agences);
app.use("/api/awakening", awakening);
app.use("/api/media", media);
app.use("/api/character_media", character_media);
app.use("/api/scenario", scenario);
// app.listen(port, "0.0.0.0", () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  },
});

// ✅ rendre io accessible partout (controllers inclus)
app.locals.io = io;

// Socket events
io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);

  io.engine.on("connection_error", (err) => {
    console.log("socket connection_error:", {
      code: err.code,
      message: err.message,
      context: err.context,
    });
  });

  // ✅ MJ rejoint la room "mj"
  socket.on("join:mj", () => {
    socket.join("mj");
    console.log(`socket ${socket.id} joined mj`);
  });

  // le joueur rejoint une room basée sur son characterId
  socket.on("join:character", ({ characterId }) => {
    if (!characterId) return;
    socket.join(`character:${characterId}`);
    console.log(`socket ${socket.id} joined character:${characterId}`);
  });

  // MJ envoie une alerte vers une liste de persos
  socket.on("mj:sendAlert", ({ targets, message, severity }) => {
    if (!Array.isArray(targets) || !message?.trim()) return;

    const payload = {
      message: message.trim(),
      severity: severity || "info",
      at: Date.now(),
    };

    targets
      .map(Number)
      .filter(Boolean)
      .forEach((id) => {
        io.to(`character:${id}`).emit("mj:alert", payload);
      });
  });

  // MJ envoie la fin de scénario (récompenses) vers une liste de persos
  socket.on("mj:scenarioEnd", ({ targets, summaryByTarget }) => {
    if (!Array.isArray(targets) || !summaryByTarget) return;

    targets
      .map(Number)
      .filter(Boolean)
      .forEach((id) => {
        const payload = summaryByTarget[id];
        if (!payload) return;

        io.to(`character:${id}`).emit("player:scenarioEnd", {
          ...payload,
          at: Date.now(),
        });
      });
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected:", socket.id);
  });
});

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
