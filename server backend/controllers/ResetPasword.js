
import User from "../models/User.js";
import sendMailer from "../utils/mail.js";
import bcrypt from "bcrypt";

 export const resetPasswordToken= async (req,res)=>{
        try{
                const {email}=req.body
                if(!email){
                   return res.json({
                        message:"email is undefined "
                    })
                }

                const checkemail= await User.findOne({email:email})
                if(!checkemail){
                    return  res.json({
                        message:'no email found '
                    })
                }
                console.log(checkemail._id)
                const token =crypto.randomUUID()

                const finding=  await User.findByIdAndUpdate({_id:checkemail._id},{
                    token:token,
                    expiryTime:Date.now()+5*60*1000
                },{new:true})

                const url=`https://localhost:3000/update-password/${token}`
                 await sendMailer(email,"password reset",`${url}`)
                  return res.status(200).json({
                    message:"token created and sent",
                    finding
                 })


        }catch(error){
                return res.status(500).json({
                    message :error.message
                })
        }
}



export  const resetPassword = async (req,res)=>{
    try{

    

        const {token,password,confirmPassword}=req.body
        if(!token||!password||!confirmPassword){
           return  res.status(404).json({
                message:"undefined data"
            })
        }

        const userDetails= await User.findOne({token:token})
       console.log(userDetails)
        if(!userDetails){
           return  res.status(404).json({
                message:"token not found"
            })
        }

        if(userDetails.expiryTime<Date.now()){
            return  res.json({
                message:"token is expired"
            })
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
       console.log(hashedPassword)
        const updatedDocer= await User.findByIdAndUpdate({_id:userDetails._id},
            {password:hashedPassword},
            {new:true}
        )
        
        return res.status(200).json({
            message:"your password is successfully changed",
           
        })
    }catch(error){
       return  res.status(500).json({
            message:"error ocuured while changing the password ",
            error:error.message
        })
    }
}