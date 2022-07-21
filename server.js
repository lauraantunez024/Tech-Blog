
const express = require("express");
const session = require("express-session");

const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const path = require("path");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers"));

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
  sequelize.sync({ force: false });
});