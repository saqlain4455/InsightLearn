import mongoose from "mongoose"

const RatingAndReviewSchema= mongoose.Schema({
   
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        review:{
            type:String,
            required:true
        },
        course:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Course"
        }
})

export default mongoose.model("RatingsAndReviews", RatingAndReviewSchema);




