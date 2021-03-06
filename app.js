var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var helmet = require("helmet");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
// var redisClient = require("redis").createClient();
var methodOverride = require("method-override");

require("dotenv").config();
require("./config/database");
require("./config/passport");

// ROUTES
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var recipeRouter = require("./routes/recipes");
// var categoryRouter = require("./routes/category");
const { lookup } = require("dns");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// var limiter = require("express-limiter")(app, redisClient);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "cdn.jsdelivr.net"],
        imgSrc: ["'self'", "i.imgur.com"],
        styleSrc: ["'self'", "cdn.jsdelivr.net"]
      },
    },
  })
);
// app.disable("x-powered-by");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "ThisIsASecretShh",
    resave: false,
    saveUninitialized: true,
  })
);

// limiter({
//   lookup: ["connection.remoteAddress"],
//   total: 100,
//   expire: 1000 * 60 * 60,
// });

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.use = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/recipes", recipeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
