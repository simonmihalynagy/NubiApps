require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const session = require("express-session");

//*configure database connection

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

//*configure session
const MongoStore = require("connect-mongo");
app.use(
  session({
    secret: "doesn't matter in our case", // but it's required

    resave: false,
    saveUninitialized: true, // create cookie for non-logged-in user

    // MongoStore makes sure the user stays logged in also when the server restarts
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const auth = require("./routes/auth");
app.use("/auth", auth);

const home = require("./routes/home");
app.use("/home", home);

const business = require("./routes/business");
app.use("/business", business);

const booking = require("./routes/booking");
app.use("/booking", booking);

const calendar = require("./routes/calendar");
app.use("/calendar", calendar);

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
