const express = require("express"),
  morgan = require('morgan'),
  favicon = require('serve-favicon'),
  path = require('path'),
  bodyParser = require("body-parser");

const { rawBodySaver, notFound, errorHandler } = require("./helpers/middlewares"),
  apiRoutes = require("./routes/api"),
  db = require("./database/db");

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(favicon(path.join(__dirname, 'favicon.ico')))

//Using the bodyParsers verify callback to exporting a raw body. You need that to verify the signature comes from SLACK.
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.json({ verify: rawBodySaver }));

// ROUTES
app.get("/", (req, res) => res.status(200).send("Welcome to the simple slackbot. This is just an API.."));
app.use("/api", apiRoutes);

// If no routes is used, this middleware kicks in and sends a error message.
app.use(notFound);
app.use(errorHandler);

module.exports = app;
