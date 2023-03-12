const express = require("express");
const router = express();

const authController = require("../controller/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.patch("/createpin/:id_users", authController.createPin);
router.post("/confirm-pin", authController.confirmPin);

module.exports = router;
