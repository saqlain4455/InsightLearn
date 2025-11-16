import mongoose from "mongoose";


const subSectionSchema= mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    timeDuration:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    vedioFile:{
        type:String,
        required:true
    }


        
})

export default mongoose.model("SubSection", subSectionSchema);