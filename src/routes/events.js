const router = require("express").Router();
const { eventHandler } = require("../controllers/events");
const { interactiveHandler } = require("../controllers/interactive");

// ROUTES that recieves events from Slack's API.
router
    .post("/messages", eventHandler)
    .post("/interactive", interactiveHandler);

module.exports = router;