

import mongoose from "mongoose";

const courseProgressSchema= mongoose.Schema({
   courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
   },
   completedVedios: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubSection"
   }]
        
})

export default mongoose.model("courseProgress", courseProgressSchema);