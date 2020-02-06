const router = require("express").Router();
const {
    eventsCommand,
    infoCommand,
    userCommand,
    jokeCommand,
    weatherCommand
} = require("../controllers/commands");

// ROUTES for recieving command requests from Slack's API.
router
    .post("/events", eventsCommand)
    .post("/info", infoCommand)
    .post("/users", userCommand)
    .post("/jokes", jokeCommand)
    .post("/weather", weatherCommand);

module.exports = router;