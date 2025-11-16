import Course from "../models/Course.js";
import Section from "../models/Section.js"

 export const CreateSection= async (req,res)=>  {
    try{

    
        const {sectionName,courseId} =req.body
        if(!sectionName,!courseId){
            return req.status(404).json({
                message:"data is undefined "
            })
        }

        const sectionDetails=  await Section.create({sectionName:sectionName})

        const update= await  Course.findByIdAndUpdate(
            {_id:courseId},
            {$push:{courseContent:sectionDetails._id}},
            {new:true}
        
        )
        return res.status(200).json({
            message:"created a section",
            data:sectionDetails
        })
        }catch(error){
            return res.status(500).json({
                message:"error occured "
            })
        }
}



 export const UpdateSection= async (req,res)=>{
    try{

    
        const {sectionName,sectionId}=req.body
        if(!sectionName,!sectionId){
            return res.status(404).json({
                message:"data is undefined"
            })
        }

        const updateSection= await Section.findByIdAndUpdate(
                                                                {_id:sectionId},
                                                                {sectionName:sectionName},
                                                                {new:true})
           return  res.status(200).json({
            message:"section updated successfully",
            data:updateSection
           })

}catch(error){
  return  res.status(400).json({
            message:"error occured while updating a section"
           })
}
 }


export  const deleteSection= async (req,res)=>{
    try{
          const {sectionId,courseId}=req.body
          if(!sectionId||!courseId){
            return res.status(404).json({
                message:"data is undefined"
            })
          }
          
    const deleteSection= await Section.findOneAndDelete({_id:sectionId})
    
    const updateCourse =await Course.findByIdAndUpdate({_id:courseId},
                                                        {$pull:{courseContent:deleteSection._id}},
                                                        {new:true}
    )
    return res.status(200).json({
        message:"section deleted successfully",
        data:updateCourse
    })
    }catch(error){
        return res.status(500).json({
            message:"error occured while deleting the section",
            error:error.message
        })
    }

  
}



    
   