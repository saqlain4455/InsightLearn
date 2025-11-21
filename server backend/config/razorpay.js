import Razorpay from "razorpay";


 export const  instance = new Razorpay({
  key_id: process.KEY_ID,
  key_secret: process.KEY_SECRET
});

