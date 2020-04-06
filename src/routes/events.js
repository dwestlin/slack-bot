const router = require("express").Router();

const { eventHandler } = require("../controllers/events");
const { interactiveHandler } = require("../controllers/interactive");
const { validateRequest, bodyChallenge } = require("../helpers/middlewares");

// ROUTES that recieves events from Slack's API.
router
  .post("/messages", bodyChallenge, validateRequest, eventHandler)
  .post("/interactive", validateRequest, interactiveHandler);

module.exports = router;
