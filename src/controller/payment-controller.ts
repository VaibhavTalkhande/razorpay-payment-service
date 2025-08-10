import { Request, Response } from "express";

const {razorpay} = require("../utils/razorpay");

var options = {
  amount: 50000,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: "INR",
  receipt: "order_rcptid_11"
};

async function createRazorpayOrder(req:Request,res:Response) {
    try {
        const order= await razorpay.orders.create(options);
        console.log(order);
        return res.json({message:order})
    } catch (error) {
        console.log("razorpay error",error)
    }
}

module.exports={
    createRazorpayOrder
}
