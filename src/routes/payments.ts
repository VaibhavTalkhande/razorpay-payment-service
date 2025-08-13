const express = require("express");
const {createRazorpayOrder,verifyPayment} = require('../controller/payment-controller');
const router = express.Router();

router.post("/create-order",createRazorpayOrder);
router.post("/verify-payment",verifyPayment);
module.exports = router;