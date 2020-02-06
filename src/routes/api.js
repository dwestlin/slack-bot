const router = require("express").Router();
const oauthRoutes = require("./oauth");
const commandRoutes = require("./commands");
const eventRoutes = require("./events");

// ROUTES
router
    .use("/commands", commandRoutes)
    .use("/events", eventRoutes)
    .use("/oauth", oauthRoutes)


module.exports = router;