import { Request, Response } from "express";
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
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Razorpay Payment Service is running');
});
app.use('/api/payment',paymentRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});