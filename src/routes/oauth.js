const router = require("express").Router();
const { installBot, authProcess } = require("../controllers/oauth");

// ROUTES oauth2
router.get("/install", installBot).get("/auth", authProcess);

module.exports = router;
