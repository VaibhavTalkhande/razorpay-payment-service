import razorpay from "../utils/razorpay";

var options = {
  amount: 50000,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: "INR",
  receipt: "order_rcptid_11"
};

async function createRazorpayOrder() {
    try {
        const order= await razorpay.orders.create(options);
        console.log(order);
        return order;
    } catch (error) {
        console.log("razorpay error",error)
    }
}
