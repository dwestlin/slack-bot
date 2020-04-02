const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { rawBodySaver, notFound, errorHandler } = require("./helpers/middlewares");
const apiRoutes = require("./routes/api");

require("./database/db");

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
app.use(notFound);
app.use(errorHandler);

module.exports = app;
