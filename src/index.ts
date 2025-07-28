import { Request, Response } from "express";

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();


app.use(cors(
    {
        origin: '*',
    }
))
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Razorpay Payment Service is running');
});

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});