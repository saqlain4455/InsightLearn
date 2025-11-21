import mongoose from "mongoose";
import sendMailer from "../utils/mail.js";

const otpSchema= mongoose.Schema({
    
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:5*60
    }
        
})

 const emailVerification = async (email,otp)=>{
    try{
         const mailResponse= await sendMailer(email,"verifiying the otp here",otp)
         console.log("maile verfication done successfully")
    }catch(error){
        console.log("error occured while sending the otp",error)
    }
 }

 otpSchema.pre("save",async function(next){
        await emailVerification(this.email,this.otp)
        next()
 })


export default mongoose.model("Otp", otpSchema);