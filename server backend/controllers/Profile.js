
import User from "../models/User.js"
import ProfileUser from "../models/Profile.js"
import Course from "../models/Course.js"
import { imageUploadToCloudinary } from "../utils/mediaUploader.js"


 export const updateProfile= async (req,res)=>{
    try{
        console.log(req.body)
          const {gender,dateofBirth,about,contactNumber}=req.body
    if(!gender||!dateofBirth||!about||!contactNumber){
    return res.status(400).json({
        message:"undefined data"
    })
    }

    const id=req.user.id
   
    const userInfo=  await User.findOne({_id:id})
    console.log(userInfo)
    const additionalDetails=userInfo.additionalDetails
    
    const updateDetails= await ProfileUser.findById({_id:additionalDetails})
    
    updateDetails.gender=gender
   
    updateDetails.dateofBirth=dateofBirth
    updateDetails.about=about
    updateDetails.contactNumber=contactNumber
    await updateDetails.save()
    return res.status(200).json({
        message:"updated data successfully"
    })
    }catch(error){
        return res.status(500).json({
            message:"something went wrong while updating details",
            error:error.message
        })
    }
  
}


export const  deleteDetails = async (req,res)=>{
        try{
            const {id}=req.user
            console.log(id)
              const userInfo=  await User.findOne({_id:id})
    const additionalDetails=userInfo.additionalDetails
    const courseId =userInfo.courses
          await ProfileUser.findOneAndDelete({ _id: additionalDetails });
await Course.findOneAndDelete({ _id: courseId });
await User.findOneAndDelete({ _id: id });

           return    res.status(200).json({
                message:"deleted successfully"
            })

        }catch(error){
                return res.status(500).json({
                    message:"something went wrong while dleting the account ",
                    error:error.message
                })
        }
}


export  const chageProfileImage = async (req,res) =>{
    try{

   
        const {displayImage} = req.files
        const userId=req.user.id
        if(!displayImage){
            return res.status(400).json({
                message:"invalid image "
            })
        }
        const imageUrl= await imageUploadToCloudinary(process.env.FOLDER_NAME,displayImage)
        const updateUser= await User.findByIdAndUpdate({_id:userId},
                                                    {image:imageUrl.secure_url}
        )
        return res.status(200).json({
            message:"image updated successfully",
            data:updateUser
        })
         }catch(error){
            return res.status(500).json({
                message:"something went wrong while uploading image ",
                error:error.message
            })
         }
}
