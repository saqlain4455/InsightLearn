import Category from "../models/Categorym.js"
import Course from "../models/Course.js"


 export const createCategory = async (req,res)=>{
    try{
          const {name,description}=req.body
        if(!name||!description){
           return   res.status(404).json({
                message:"input is undefined "
            })
        }
        
        const already =  await Category.findOne({name:name})
        if(already){
             return res.status(500).json({
                message:"the category already exists "
            })
        }
        console.log(already)
          const newdata= await Category.create({name:name,description:description})
         return  res.status(200).json({
            message:"data recieved successfully",
            data:newdata
        })
    }catch(error){
         return res.status(500).json({
            message:"error occured while inserting the data",
            error:error.message
        })
    }
      

      
}

 export const showCategory=async  (req,res)=>{
    try{
        const  data= await Category.find({})
         return res.json({
            message:"success",
            data:data
        })
    }catch(error){
         return res.json({
            message:"cannot show the data "
        })
    }
   
   
}


 export const getCategoryDetails = async (req,res)=>{
    try{

   
    const {categoryId} = req.body
    
    const showCategory = await Category.findById({_id:categoryId})
                                                .populate("course")
        if(!showCategory){
            return res.status(404).json({
                message:"category not found "
            })
        }

        const differentCategory = await Category.find({
                                        _id:{$ne:categoryId}
        })


        const popularCategory = await Course.aggregate([
            {
        $project:{
            _id:1,
            totalStudents:{$sum:"$studentsEnrolled"}

        }
     },{
        $sort:{
            totalStudents:-1
        }
     },{
        $limit:5
     }
     ])
        return res.status(200).json({
            message:"success",
            data:showCategory
        })
         }catch(error){
            return res.status(500).json({
                message:"somthing went wrong while fecthing with id ",
                error:error.message
            })
         }

}