const express = require("express");
const { route } = require("./auth.route");
const router = express();

const authRoute = require("./auth.route");
const transactionRoute = require("./transaction.route");

router.get("/", (req, res) => {
  return res.send("backend for fazzpay");
});

router.use("/auth", authRoute);
router.use("/transaction", transactionRoute);

module.exports = router;
