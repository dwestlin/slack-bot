const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require("./database/db");

const middlewares = require("./helpers/middlewares");
const apiRoutes = require("./routes/api");
  
const app = express();

app.use(bodyParser.urlencoded({ verify: middlewares.rawBodySaver, extended: true }));
app.use(bodyParser.json({ verify: middlewares.rawBodySaver }));
app.use(morgan("tiny"));

app.get("/", (req, res) => res.status(200).send("Slackbot.🌱"));
app.use("/api", apiRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
