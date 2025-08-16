import { Request, Response } from "express";
const { validateWebhookSignature } =require("razorpay");
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const paymentRoute = require('../src/routes/payments')
dotenv.config();
const app = express();
console.log(process.env.RAZORPAY_KEY_ID);
console.log(process.env.RAZORPAY_KEY_SECRET)

app.use(cors(
    {
        origin: '*',
    }
))

app.post('/api/webhook', express.raw({ type: 'application/json' }), (req: Request, res: Response) => {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
        throw new Error("RAZORPAY_WEBHOOK_SECRET is not defined in environment variables.");
    }
    const isValid = validateWebhookSignature(
      JSON.stringify(req.body),
      req.headers['x-razorpay-signature'] as string,
      webhookSecret
    );
     if (isValid) {
      const { event, payload } = req.body;

      switch (event) {
        case "payment.authorized":
          console.log("Payment authorized:", payload);
          break;
        case "payment.captured":
          console.log("Payment captured:", payload);
          break;
        case "payment.failed":
          console.log("Payment failed:", payload);
          break;
        default:
           console.log(`Unhandled event: ${event}`);
          break;
      }
    }
   res.status(200).send();
});
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Razorpay Payment Service is running');
});
app.use('/api/payment',paymentRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});