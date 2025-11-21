
import User from "../models/User.js"
import Course from "../models/Course.js"
import Category from "../models/Categorym.js"
import { imageUploadToCloudinary } from "../utils/mediaUploader.js"
import Categorym from "../models/Categorym.js"
import RatingsandReviews from "../models/RatingsandReviews.js"
import SubSections from "../models/SubSections.js"
import Section from "../models/Section.js"
 export const createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag, category } = req.body;
        const thumbnail = req.files?.thumbnail;

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
            return res.status(404).json({
                message: "You have to enter every detail here"
            });
        }

       
        const maxSize = 2 * 1024 * 1024;
        if (thumbnail.size > maxSize) {
            return res.status(400).json({
                message: "Thumbnail should not be more than 2 MB"
            });
        }

        const userId = req.user.id;
        const userDetails = await User.findOne({ _id: userId });
        if (!userDetails) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const categoryDetails = await Category.findOne({ _id: category });
        if (!categoryDetails) {
            return res.status(404).json({
                message: "Undefined category"
            });
        }

       
        const thumbnailDetails = await imageUploadToCloudinary(process.env.FOLDER_NAME, thumbnail);

       
        const course = await Course.create({
            courseName,
            courseDescription,
            instructor: userDetails._id,
            whatYouWillLearn,
            price,
            tag,
            Category: category,
            thumbnail: thumbnailDetails.secure_url
        });

       
        await User.findByIdAndUpdate(
            userDetails._id,
            { $push: { courses: course._id } },
            { new: true }
        );

        // Update category with new course
        await Category.findByIdAndUpdate(
            category,
            { $push: { course: course._id } },
            { new: true }
        );

        return res.status(200).json({
            message: "Course created successfully",
            course
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error occurred",
            error: error.message
        });
    }
};


export const  getAllCourse = async(req,res)=>{
    try{
        const getAllDetails=await   Course.find({},{courseName:true,
                                            price:true,
                                            ratingaAndReviews:true,
                                            instructor:true,
                                            thumbnail:true,
                                            courseDescription:true,
                                            studentsEnrolled:true,})
                                            .populate("instructor")
                                            .exec()
        

    
         return res.status(200).json({
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


export const DeleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId || !userId) {
      return res.status(400).json({
        message: "data undefined"
      });
    }

    // Find the course
    const checkId = await Course.findById(courseId).populate("courseContent");
    if (!checkId) {
      return res.status(400).json({
        message: "invalid Id"
      });
    }

    // -------- DELETE SUBSECTIONS --------
    for (const section of checkId.courseContent) {
      if (section.subSection && section.subSection.length > 0) {
        await SubSections.deleteMany({ _id: { $in: section.subSection } });
      }
    }

    // -------- DELETE SECTIONS --------
    await Section.deleteMany({
      _id: { $in: checkId.courseContent.map((sec) => sec._id) }
    });

    // -------- DELETE COURSE --------
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    // -------- REMOVE FROM USER --------
    await User.findByIdAndUpdate(
      userId,
      { $pull: { courses: courseId } }
    );

    // -------- REMOVE FROM CATEGORY --------
    await Category.findByIdAndUpdate(
      checkId.Category,
      { $pull: { course: courseId } }
    );

    return res.status(200).json({
      message: "Course, sections, and subsections deleted successfully",
      data: deletedCourse
    });

  } catch (error) {
    return res.status(500).json({
      message: "something went wrong while deleting course",
      error: error.message
    });
  }
};




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
