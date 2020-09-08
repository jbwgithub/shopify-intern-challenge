const express = require("express");
const morgan = require("morgan");
const path = require("path");

//For DB:
const { db } = require("./models");

const app = express();

// logging and body-parsing
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send("Something went wrong: " + err.message);
});

// listen on a port
const PORT = 8080;

const init = async function () {
  await db.sync() // uncomment once you've done the db steps
  app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();
