require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { rawBodySaver } = require("./helpers/rawBodySaver");
const apiRoutes = require("./routes/api");

//Using the bodyParsers verify callback to exporting a raw body. You need that to verify the signature comes from SLACK.
app.use(
  bodyParser.json({
    verify: rawBodySaver
  })
);
app.use(
  bodyParser.urlencoded({
    verify: rawBodySaver,
    extended: true
  })
);

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the simple slackbot. This is just an API.");
});

app.use("/api", apiRoutes);

// If no routes is used, this middleware kicks in and send a error message.
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

module.exports = app;
