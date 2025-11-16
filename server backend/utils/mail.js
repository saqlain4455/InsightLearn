import mongoose from "mongoose";
import nodemailer from "nodemailer"

const sendMailer = async (email,title,body)=>{
    try{
        const crateTransporter= nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

             let sender= await crateTransporter.sendMail({
                from:"saqlain4881@gmail.com",
                to:`${email}`,
                subject:`${title}`,
                html:`${body}`
             })
    }catch(error){
        console.log("error occured in the email",error)
    }
} 
export default sendMailer
   
