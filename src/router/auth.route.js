const express = require("express");
const router = express();

const authController = require("../controller/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);
// router.get("/users", authController.get);
// router.get("/users/:id", authController.getDetail);
// router.patch("/users/:id", authController.update);
// router.patch("/users/topup/:id", authController.topup);

module.exports = router;
