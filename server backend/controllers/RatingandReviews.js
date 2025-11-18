import mongoose from "mongoose"
import Course from "../models/Course.js"
import RatingsandReviews from "../models/RatingsandReviews.js"

export  const createReviews = async (req,res)=>{
    try{
          const {courseId,rating,review}= req.body
          const userId= req.user.id
         
    if(!courseId||!rating||!review||!userId){
        return res.status(404).json({
            message:"data is undefined "
        })
    }

    const course = await Course.findOne({_id:courseId,
                                            studentsEnrolled:{$elemMatch:{$eq:userId}}
    })
                if(!course){
                    return res.status(404).json({
                        message:"you can't give the review"
                    })
                }

       
      const checkingUser = await RatingsandReviews.findOne({user:userId,
                                                            course:courseId
      })
      if(checkingUser){
        return res.status(500).json({
            message:"already review exists"
        })
      }



      const newrating = await RatingsandReviews.create({user:userId,
                                                   rating:rating,
                                                   review:review,
                                                   course:courseId
    })

    const ratingAndReviewsDetails= await Course.findByIdAndUpdate({_id:courseId},
                                                {$push:{ratingAndReviews:newrating._id}}
    )

        return res.status(200).json({
            message:"you review created ",
            data:ratingAndReviewsDetails
        })
    }catch(error){
        return res.status(500).json({
            message:"error occured while creating review ",
            error:error.message
        })
    }
  

}

export const averageRating = async (req, res) => {
  try {
    
    const { courseId } = req.body;
    console.log(courseId)
    if (!courseId) {
      return res.status(400).json({
        message: "courseId is undefined"
      });
    }

    const average = await RatingsandReviews.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId)
        }
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" }
        }
      }
    ]);

    if (average.length === 0) {
      return res.status(200).json({
        message: "no ratings yet",
        averageRating: 0
      });
    }

    return res.status(200).json({
      message: "average success",
      averageRating: average[0].averageRating
    });

  } catch (error) {
    return res.status(500).json({
      message: "average error",
      error: error.message
    });
  }
};




 export const getAllReviews = async (req, res) => {
  try {
    const id = req.body.courseId;
    if (!id) {
      return res.status(404).json({ message: "undefined data" });
    }

    const getallreviews = await RatingsandReviews.find({ course: id })
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "lastName firstName image"
      })
      .populate({
        path: "course",
        select: "courseName"
      });

    

    return res.status(200).json({
      message: "success",
      data: getallreviews
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong while getting the data"
    });
  }
};
