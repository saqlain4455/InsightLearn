
import mongoose from "mongoose";

const courseSchema= mongoose.Schema({

        courseName:{
            type:String,
            required:true
        },
        courseDescription:{
            type:String,
            required:true
        },
       instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

       },
       whatYouWillLearn:{
        type:String
       },
       courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
        required:true
       }],
       ratingaAndReviews:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
        
       },
       price:{
        type:Number
       },
       thumbnail:{
        type:String
       },
       Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        
       },
       tag:{
        type:[String],
        required:true
       },
       studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
       }],
       Status:{
        type:String,
        enum:["Draft","Published"]
       }

})

export default mongoose.model("Course", courseSchema);