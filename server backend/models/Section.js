import mongoose from "mongoose";

const SectionSchema= mongoose.Schema({

   sectionName:{
    type:String,
    required:true
    },
    subSection:[{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"SubSection"
    }]


        
})

export default mongoose.model("Section", SectionSchema);