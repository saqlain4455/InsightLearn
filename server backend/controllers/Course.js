
import User from "../models/User.js"
import Course from "../models/Course.js"
import Category from "../models/Categorym.js"
import { imageUploadToCloudinary } from "../utils/mediaUploader.js"
import Categorym from "../models/Categorym.js"
import RatingsandReviews from "../models/RatingsandReviews.js"

 export const createCourse= async (req,res)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,tag,category} =req.body
         const thumbnail=req.files.thumbnail
    
        if(!courseName||!courseDescription||!whatYouWillLearn||!price||!tag||!thumbnail){
            res.status(404).json({
                message:"you have to enter evreydetail here"
            })
        }
        const info=req.user.id
        const userDetails= await User.findOne({_id:info})
        if(!userDetails){
            return  res.status(404).json({
                message:"user not found "
            })
        }

        const verify= await Category.findOne({_id:category})
        if(!verify){
             return res.status(404).json({
                message:"undefined category"

            })
        }
        
        const thumbnailDetails= await imageUploadToCloudinary(process.env.FOLDER_NAME,thumbnail)
       
        const contentDetails=await Course.create({
            courseName,
            courseDescription,
            instructor:userDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tag,
            Category:category,
            thumbnail:thumbnailDetails.secure_url

        })
           
        const updateUser= await User.findByIdAndUpdate(
            {_id:userDetails._id},
            {$push:{courses:contentDetails._id}},
            {new:true}
        )

        const updatedTag = await Category.findByIdAndUpdate(
            {_id:category},
            {$push:{course:contentDetails._id}},
            {new:true}
        
        )


        return res.json({
            message:"course created successfully",
             course:contentDetails
        })

    }catch(error){
            return res.status(500).json({
                message :"eror occured ",
                error:error.message
            })
    }
}


export const  getAllCourse = async(req,res)=>{
    try{
        const getAllDetails=await   Course.find({},{courseName:true,
                                            price:true,
                                            ratingaAndReviews:true,
                                            instructor:true,
                                            studentsEnrolled:true,})
                                            .populate("instructor")
                                            .exec()
        

    
        res.status(200).json({
            message:"success",
            data:getAllDetails
        })
    }catch(error){
        res.status(400).json({
            message:"error cannot access the course",
           
        })
    }
}

export  const FullCourseDetails = async (req,res)=>{
    try{
             const id=req.body.courseId
        if(!id){
            return res.status(200).json({
                message:"id is undefined "
            })
        }
        
        const CourseDetails = await Course.findById({_id:id}).populate({
                                path:"instructor",
                                populate:{
                                    path:"additionalDetails"
                                }
                            })
                            .populate({
                                path:"courseContent",
                                populate:{
                                    path:"subSection"
                                }
                                
                            })
                            .populate("ratingAndReviews")
                            .populate("Category")
                            .populate("studentsEnrolled")
                            
                            
                if(!CourseDetails){
                 return res.status(404).json({
                 message:"no id found "
                         }) }
        return res.status(200).json({
            message:"success",
            data:CourseDetails
            
        })
    }catch(error){
        return res.status(500).json({
            message:"no data found ",
            error:error.message
        })
    }
       


}
export  const CourseDetails = async (req,res)=>{
    try{
             const id=req.body.courseId
        if(!id){
            return res.status(200).json({
                message:"id is undefined "
            })
        }
        
        const CourseDetails = await Course.findById({_id:id}).populate("courseContent")
                           
                            
                if(!CourseDetails){
                 return res.status(404).json({
                 message:"no id found "
                         }) }
        return res.status(200).json({
            message:"success",
            data:CourseDetails
            
        })
    }catch(error){
        return res.status(500).json({
            message:"no data found ",
            error:error.message
        })
    }
       


}

export const updateCourse= async  (req,res)=>{
    try{

    
const {courseId,courseName,courseDescription,whatYouWillLearn,price,tag,category} = req.body
    
     const {thumbnailImage}=req.files
       
        if(!courseId||!courseName||!courseDescription||!whatYouWillLearn||!price||!tag||!category||!thumbnailImage){
            return res.status(400).json({
                message:"data is undefined "
            })
        }
        const exist= await Course.findOne({_id:courseId})
        if(!exist){
            return res.status(500).json({
                message:"courseId invalid  "
            })
        }

        const getDetails = await Category.findOne({course:courseId})
        if(!getDetails){
            return res.status(404).json({
                message:"no course found in category"
            })
        }

        const delCourse= await Category.findByIdAndUpdate({_id:getDetails._id},
                                                            {$pull:{course:courseId}}
        )

        const thumbnailDetails= await imageUploadToCloudinary(process.env.FOLDER_NAME,thumbnailImage)

        const newCourse= await Course.findByIdAndUpdate({_id:courseId},
                                                        {courseName:courseName,
                                                        courseDescription:courseDescription,
                                                        whatYouWillLearn:whatYouWillLearn,
                                                        price:price,
                                                        tag:tag,
                                                        Category:category,
                                                        thumbnail:thumbnailDetails.secure_url
                                                        }
        )

         const updateCategory =await  Category.findByIdAndUpdate({_id:category},
                                                                {$push:{course:courseId}}
         )
        return res.status(200).json({
            message:"updated successfully"
        })
    }catch(error){
        return res.status(500).json({
            message:"error while updating the course",
            error:error.message
        })
    }
}


export const DeleteCourse = async (req,res)=>{
    try{

   
    const {courseId} =req.body
    console.log(courseId)
    const userId =req.user.id
    console.log(userId)
    console.log(userId)
    if(!courseId||!userId){
        return res.status(400).json({
            message:"data undefined"
        })
    }

    const checkId= await Course.findOne({_id:courseId})
    if(!checkId){
        return res.status(400).json({
            message:"invalid Id"
        })
    }
    
    const categoryId= checkId.Category
    console.log(checkId)
    const deletedId = await Course.findByIdAndDelete({_id:courseId})

    const update = await User.findByIdAndUpdate({_id:userId},
                                                {$pull:{courses:courseId}}
    )
    const category = await Category.findByIdAndUpdate({_id:categoryId},
                                                    {$pull:{course:courseId}}
    )
    console.log(category)
    return  res.status(200).json({
        message:"Deleted successfully",
        data:deletedId
    })
     }catch(error){
        return res.status(500).json({
            message:"somthing went wrong while deleting course",
            error:error.message
        })
     }
}




/* keep it separate */

export const purchasedPayment = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    console.log(userId)
    console.log(courseId)
    if (!userId || !courseId) {
      return res.status(400).json({
        message: "data is undefined"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check if course already purchased
    const found = user.courses.some(id => id.equals(courseId));

    if (found) {
      return res.status(400).json({
        message: "User already purchased this course"
      });
    }

    // Add course
    await User.findByIdAndUpdate(
      userId,
      { $push: { courses: courseId } }
    );

    await Course.findByIdAndUpdate({
        _id:courseId
    },
    {$push:{studentsEnrolled:userId}}
)

    return res.status(200).json({
      message: "Payment added successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while adding",
      error: error.message
    });
  }
};
