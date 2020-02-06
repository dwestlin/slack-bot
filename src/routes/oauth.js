const router = require("express").Router();
const {
    installBot,
    authProcess
} = require('../controllers/oauth');

// ROUTES
router
    .get("/install", installBot)
    .get("/auth", authProcess);

module.exports = router;