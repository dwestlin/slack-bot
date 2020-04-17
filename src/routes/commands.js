const router = require("express").Router();

const { validateRequest } = require("../helpers/middlewares");
const { getEvents, getInfo, getUsers, getJoke, getWeather, addBiography } = require("../controllers/commands");

router.post("/events", validateRequest, getEvents);
router.post("/info", validateRequest, getInfo);
router.post("/users", validateRequest, getUsers);
router.post("/jokes", validateRequest, getJoke);
router.post("/weather", validateRequest, getWeather);
router.post("/biography", validateRequest, addBiography);

module.exports = router;
