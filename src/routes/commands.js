const router = require("express").Router();

// Custom middleware that ensures and verifies that incoming request comes from slack.
const { validateRequest } = require("../helpers/middlewares");
const { commandHandler } = require("../controllers/commands");

router.post("/:command", validateRequest, commandHandler);

module.exports = router;
