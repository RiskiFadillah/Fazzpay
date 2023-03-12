const express = require("express");
const router = express();

const transactionController = require("../controller/transaction.controller");

// router.get("/alltrasaction", transactionController.get);
router.get("/detailtransaction/", transactionController.getDetail);
router.post("/updatetransaction/", transactionController.update);

module.exports = router;
