import mongoose, { Schema } from "mongoose";

const UserSchema= mongoose.Schema({
        firstName:{
            type:String,
            required:true,
            trim:true,
        },
        lastName:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
        },      
        password:{
            type:String,
            required:true
        },
        accountType:{
            type:String,
            enum:["Student","Admin","Instructer"],
            required:true
        },
       
        additionalDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"ProfileUser"
        },
        courses:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }],

        token:{
            type:String
        },
        expiryTime:{
            type:String,
            default:Date.now
        },
        image:{
            type:String,
            required:true
        },

        courseProgress: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }]
        
})

export default mongoose.model("User", UserSchema);




