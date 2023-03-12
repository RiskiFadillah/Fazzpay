const express = require("express");
const router = express();
const historyController = require("../controller/history.controller");


router.get("/:id", historyController.getHistory);

module.exports = router;