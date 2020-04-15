const router = require("express").Router();

const { validateRequest } = require("../helpers/middlewares");
const commands = require("../controllers/commands");

router.post("/events", validateRequest, commands.getEvents);
router.post("/info", validateRequest, commands.getInfo);
router.post("/users", validateRequest, commands.getUsers);
router.post("/jokes", validateRequest, commands.getJoke);
router.post("/weather", validateRequest, commands.getWeather);
router.post("/biography", validateRequest, commands.addBiography);

module.exports = router;
