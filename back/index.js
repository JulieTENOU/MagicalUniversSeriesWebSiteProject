const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const port = 3333;
const Sequelize = require('sequelize');
const dbConfig = require("./src/config/db-config");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
  }
);

app.use(express.static(__dirname + '/public'));

// This is used to parse json post request in the body. It's essential to handle forms
app.use(express.json());
app.use(cors());

// We need body-Parser in order for this app to handle urlencoded POST requests properly
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


// We need to set up the cookie requirement for the authenticated token
const authConfig = require("./src/config/authKey");
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "MAGame-session",
    secret: authConfig.secret,
    httpOnly: true,
  })
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

// This is the app requireing the route that will receive the http request and interact with the controller
const user = require('./src/routes/user');
const books = require('./src/routes/books');
const chapters = require('./src/routes/chapters');
const book_parts = require('./src/routes/book_parts');
const series = require('./src/routes/series');
const authService = require("./src/routes/authService");
const characters = require('./src/routes/characters');
const inventories = require('./src/routes/inventories');
const ingredients = require('./src/routes/ingredients');
const crystals = require('./src/routes/crystals');
const creatures = require('./src/routes/creatures');
const currentGauges = require('./src/routes/currentGauges');
const draconiqueHeart = require('./src/routes/draconiqueHeart');
const preferences = require('./src/routes/preferences');

// This actually calls the route!
app.use("/users", user);
app.use("/books", books);
app.use("/read/xalyt/parts", book_parts);
app.use("/read/MA/parts", book_parts);
app.use("/read/xalyt/chapters", chapters);
app.use("/read/xalyt/1/chapters", chapters);
app.use("/read/xalyt/2/chapters", chapters);
app.use("/read/xalyt/3/chapters", chapters);
app.use("/read/MA/chapters", chapters);
app.use("/read/MA/1/chapters", chapters);
app.use("/series", series);
app.use("/characters", characters);
app.use("/inventories", inventories);
app.use("/ingredients", ingredients);
app.use("/crystals", crystals);
app.use("/creatures", creatures);
app.use("/gauges", currentGauges);
app.use("/api", authService);
app.use("/draconiqueHeart", draconiqueHeart)
app.use('/api/preferences', preferences);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`)
});