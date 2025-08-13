import { Request, Response } from "express";
const {razorpay} = require("../utils/razorpay");
const crypto = require('crypto');
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

function verifyPayment(req:Request,res:Response){
    try{
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign= crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(sign).digest("hex");
        if(razorpay_signature === expectedSign){
            return res.json({message:"Payment verified successfully"});
        }
        else{
            return res.status(400).json({message:"Payment verification failed"});
        }
    }
    catch(error){
        console.log("razorpay error",error)
        return res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports={
    createRazorpayOrder,
    verifyPayment
}
