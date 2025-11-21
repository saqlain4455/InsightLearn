import mongoose from "mongoose";
import { instance } from "../config/razorpay.js";
import Course from "../models/Course";
import { json } from "express";
import User from "../models/User";

const createPayment = async (req,res)=>{
    try{

   
        const {courseId}=req.body
        const UserId =req.user.id

        if(!courseId||UserId){
            return  req.status(404).json({
                message:"undefined data"
            })
        }
        let courseInfo
        try{
                 const courseInfo = await Course.findone({_id:courseId})
                 console.log(courseInfo)
                 const uid=mongoose.Types.ObjectId(UserId)
                 if(courseInfo.studentsEnrolled.includes(uid)){
                        return res.status(404).json({
                            message:"student has alreay have this course "
                        })
                 }
        }catch(eror){
             return res.status(500).json({
                message:"somthing went wrong in coparision"
            })
        }
       
        const amount=courseInfo.price
        const Currency="INR"
         const options={
                amount:amount*100,
                Currency,
                reciept: Math.random(Date.now().toString()),
                notes:{
                    courseId:courseInfo._id,
                    UserId
                }
        }
        try {
            const paymentResponse= await instance.orders.create(options)
            return  res.status(200).json({
                message:"sent successfully",
                couseId:courseInfo._id,
                coureDiscription:courseInfo.discription,
                thumbnail:courseInfo.thumbnail,
                orderId:paymentResponse._id,
                amount:paymentResponse.amount,
                Currency:paymentResponse.Currency

            })
            }catch(error){
                    return res.status(500).json({
                        message:"something went wrong in my payment gateway "
                    })
            }

 }catch(error){
        return res.status(500).json({
            message:"something went wrong while  making the payment "
        })
 }

}



const verifySignature= async (req,res)=>{
    const webSecret = "123456"
    const token = req.headers("x-Razopay-signature");
    const shasum = crypto.create.hmac("sha256",webSecret)
        shasum.update(JSON.stringyfy(req.body))
    const digest= shasum.digest("hex")

    if(digest==token){
      
        try{
        const {courseId,userId} =req.body.payload.payment.entity.notes
        const update= await Course.findByIdAndUpdate({_id:courseId},
                                                    {$push:{studentsEnrolled:userId}},
                                                    {new:true}
        )
        const newUser= User.findByIdAndUpdate({_id:userId},
                                            {$push:{courses:courseId}}
        )
        return res.status(200).json({
            message:"updated user courses successfully"
        })
    }catch(error){
            return res.status(500).json({
                message:"something went wrong during the update "
            })
    }




    }


}





