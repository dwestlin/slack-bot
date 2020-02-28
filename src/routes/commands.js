const router = require("express").Router();
const {
  eventsCommand,
  infoCommand,
  userCommand,
  jokeCommand,
  weatherCommand
} = require("../controllers/commands");

const { validateRequest } = require("../helpers/validateRequest");

// ROUTES for recieving command requests from Slack's API.
router
  .post("/events", validateRequest, eventsCommand)
  .post("/info", infoCommand)
  .post("/users", userCommand)
  .post("/jokes", jokeCommand)
  .post("/weather", weatherCommand);

module.exports = router;
