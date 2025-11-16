import mongoose from "mongoose"

const categorySchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
        
    }]
   
})

export default mongoose.model("Category", categorySchema);