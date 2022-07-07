var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");

const { uri } = require("./config/keys");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

Promise.resolve(app)
  .then(MongoDBConnection)
  .catch((err) => {
    console.log(err);
    console.error.bind(
      console,
      `MongoDB connection error: ${JSON.stringify(err)}`
    );
  });

// Database Connection
async function MongoDBConnection(app) {
  console.log(`| MongoDB URL  : ${uri}`);
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    })
    .then(() => {
      console.log("| MongoDB Connected");
      console.log("|--------------------------------------------");
    });

  return app;
}

app.use("/", indexRouter);

module.exports = app;
