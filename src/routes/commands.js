const router = require("express").Router();
const {
  eventsCommand,
  infoCommand,
  userCommand,
  jokeCommand,
  weatherCommand,
  addInfoCommand
} = require("../controllers/commands");

// Custom middleware that ensures and verifies that incoming request comes from slack.
const { validateRequest } = require("../helpers/validateRequest");

// ROUTES for recieving command requests from Slack's API.
router
  .post("/events", validateRequest, eventsCommand)
  .post("/info", validateRequest, infoCommand)
  .post("/users", validateRequest, userCommand)
  .post("/jokes", validateRequest, jokeCommand)
  .post("/weather", validateRequest, weatherCommand)
  .post("/addInfo", validateRequest, addInfoCommand);

module.exports = router;
