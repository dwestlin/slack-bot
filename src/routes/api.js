const router = require("express").Router();

const oauthRoutes = require("./oauth"),
  commandRoutes = require("./commands"),
  eventRoutes = require("./events");

// DECLARING ROUTES
router
  .use("/commands", commandRoutes)
  .use("/events", eventRoutes)
  .use("/oauth", oauthRoutes);

module.exports = router;
