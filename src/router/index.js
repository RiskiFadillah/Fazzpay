const express = require("express");
const { route } = require("./auth.route");
const router = express();

const authRoute = require("./auth.route");
const transactionRoute = require("./transaction.route");
const userRouter = require("./users.route");
const historyRoute = require("./history.route");

router.get("/", (req, res) => {
  return res.send("backend for fazzpay");
});

router.use("/auth", authRoute);
router.use("/transaction", transactionRoute);
router.use("/users", userRouter);
router.use("/history", historyRoute);

module.exports = router;
