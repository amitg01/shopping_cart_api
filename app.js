var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expressStaticGzip = require("express-static-gzip");
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");

// require('./models/Cart');
// require('./models/User');

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

var app = express();

require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/shopping_cart",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    err
      ? console.log("error connecting")
      : console.log("connected to database");
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", apiRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
