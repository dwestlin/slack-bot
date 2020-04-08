const router = require("express").Router();

const { validateRequest } = require("../helpers/middlewares");
const { commandHandler } = require("../controllers/commands");

router.post("/:command", validateRequest, commandHandler);

module.exports = router;
