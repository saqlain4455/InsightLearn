
import Otp from "../models/Otp.js"
import User from "../models/User.js"
import otpgenerator from "otp-generator"
import jwt from "jsonwebtoken"
import sendMailer from "../utils/mail.js"
import bcrypt from "bcrypt";
import ProfileUser from "../models/Profile.js"

 export const sendOtp =  async (req,res)=>{
    try{
    const {email}=req.body
    if(!email){
        return  res.status(404).json({
            message:"email is not defined"
        })
    }

    const checkEmail= await User.findOne({email})
    if(checkEmail){
        return  res.status(400).json({
            message:"email already  exist " 
        })
    }

        let otp=otpgenerator.generate(6,{
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        })

       
        
        const already= await  Otp.findOne({otp})
        while(already){
             let otp=otpgenerator(6,{
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        })
       let already= await  Otp.findOne({otp})}

       
       
       
         const createOtp =  await Otp.create({
            email:email,
            otp:otp
         })
        

         
         return res.status(200).json({
            message:"otp generated successfully"
        })

         
    }catch(error){
            return res.status(500).json({
                message:error.message
            })
    }
}



 export const SignUp= async (req,res)=>{

    try{
        const   {
            firstName,
            lastName,
            email,
            password,
           confirmPassword,
            accountType,
            otp
        }=req.body

        if(!email||!firstName||!lastName||!password||!otp||!accountType||!confirmPassword){
                return  res.status(404).json({
                    message:"given data is not defined "
                })
        }

        const already= await User.findOne({email})
        if(already){
           return   res.status(400).json({
                message:"user already exist "
            })
        }


        if(confirmPassword!==password){
           return   res.status(400).json({
                message:"invlaid password check "
            })
        }


            const latestOtp= await Otp.findOne({email}).sort({ createdAt: -1 }).limit(1);
            
            if(latestOtp.length===0){
               return  res.status(404).json({
                    message:"otp not found "
                })
            }else if(otp!==latestOtp.otp){
                 return res.status(404).json({
                    message:"otp expired "
                })
            }

            const hashedPassword =  await  bcrypt.hash(password,10)
            
            const additionalDetails= await ProfileUser.create({
                gender:null,
                dateofBirth:null,
                about:null,
                contactNumber:null
            })
          
            const fullInfo= await User.create({
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:hashedPassword,
                accountType:accountType,
                additionalDetails:additionalDetails._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
                
            })
             return res.status(200).json({
                message:"user signed up",
                fullInfo:fullInfo
            })

    }catch(error){
        return  res.status(500).json({
            message:"error occured while signing up",
            error:error.message
        })
    }
}


 export const login = async (req,res)=>{
    try{

    
    const {email,password}=req.body
   
    if(!email||!password){
        return  res.status(404).json({
            message:"email or password undefined "
        })
    }
    
    const user= await User.findOne({email:email})
                                .populate("additionalDetails")
                                
   
    if(!user){
        return  res.status(200).json({
            message:"email is not signed in "
        })
    }
    

       
   
        const validation= await bcrypt.compare(password,user.password)
       
        if(validation){
             
            const token =jwt.sign({ 
                id:user._id,
                email:user.email,
            name:user.name,
            accountType:user.accountType  },
                process.env.JWT_SECRET,
                
                {
                    expiresIn:"2h"
                }
            )
            
            user.token=token
            user.password=undefined
             const Options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                
            }
         return res.cookie("token",token,Options).status(200).json({
            token,
            user,
            message:"logged in successfully"
        })
        }else{
            return  res.status(500).json({
                message:"incorrect password "
            })
        }
           
    }catch(error){
            return  res.status(500).json({
                message:error.message
            })
    }
}





export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword, email } = req.body;

  
    if (!oldPassword || !newPassword || !confirmPassword || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );

    await sendMailer(email, "Password Changed", "Your password has been updated successfully.");

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};






 export const getUsersInfo = async(req,res)=>{
        try{
            const {userId} = req.body
            if(!userId){
                return res.status(400).json({
                    message:"undefined data"
                })
            }
                const response = await User.findOne({_id:userId}).populate("courses")
                console.log(response)
                if(!response){
                    return res.status(400).json({
                        message:"user not found"
                    })
                }
                return res.status(200).json({
                    message:"user found",
                    data:response
                })

        }catch(error){
                return res.status(500).json({
                    message:"somthing went wrong while fetching the data",
                    error:error.message

                })
        }
}




export  const updateUser =  async (req,res)=>{
    try{

    
    const  {courseId} = req.body
    const userId= req.user.id
        console.log(userId)
         console.log(courseId)
    if(!userId||!courseId){
        return res.status(400).json({
            message:"data is undefined "
        })
    }

    const response  =await User.findByIdAndUpdate({_id:userId},
                                                    {$pull:{courses:courseId}}
    )
    console.log(response)

    return res.status(200).json({
        message:"deleted successfully",
        data:response._id
    })
    }catch(error){
        return res.status(500).json({
            message:"error occureed while updating the user ",
            error:error.message
        })
    }

}