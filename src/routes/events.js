const router = require("express").Router();
const { eventHandler } = require("../controllers/events");
const { interactiveHandler } = require("../controllers/interactive");
const { validateRequest } = require("../helpers/validateRequest");

// ROUTES that recieves events from Slack's API.
router
  .post("/messages", validateRequest, eventHandler)
  .post("/interactive", interactiveHandler);

module.exports = router;
