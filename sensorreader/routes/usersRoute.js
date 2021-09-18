const express = require("express");
const sensorsRoute = require('../controllers/sensorsController')

router = express.Router();

router.get("/", sensorsRoute.sensorsController);

module.exports = router;