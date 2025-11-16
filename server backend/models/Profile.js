import mongoose from "mongoose";

const ProfileSchema= mongoose.Schema({
    gender:{
        type:String,
       
    },
   dateofBirth:{
    type:String,
   
   },
   about:{
    type:String,
   
   },
   contactNumber:{
    type:Number,
    
   },
   displayImage:{
    type:String
   }
       
})

export default mongoose.model("ProfileUser", ProfileSchema);




