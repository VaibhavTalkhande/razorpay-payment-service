const express = require("express");
const {createRazorpayOrder} = require('../controller/payment-controller');
const router = express.Router();

router.post("/create-order",createRazorpayOrder);

module.exports = router;