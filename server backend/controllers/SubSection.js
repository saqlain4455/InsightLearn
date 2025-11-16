import Section from "../models/Section.js";
import SubSections from "../models/SubSections.js";
import { imageUploadToCloudinary } from "../utils/mediaUploader.js";



 export const createSubSection = async (req,res)=>{
    try{
 const {sectionId,title,timeDuration,description}  = req.body
    const vedioFile =req.files.vedioFile
    if(!sectionId||!title||!timeDuration||!description||!vedioFile){
        return res.status(404).json({
            message:"data is undefined "
        })
    }

     const uploadDetails= await imageUploadToCloudinary(process.env.FOLDER_NAME,vedioFile)
    

    const newSubSection= await SubSections.create({
        title:title,
        timeDuration:timeDuration,
        description:description,
        vedioFile:uploadDetails.secure_url
    })

    const newSection=await Section.findByIdAndUpdate({_id:sectionId},
                                                        {$push:{subSection:newSubSection._id}},
                                                        {new:true}
    )

    return res.status(200).json({
        message:"subsection created successfully"
    })
    }catch(error){
        return res.status(500).json({
            message:"something went wrong while creating the subsection "
        })
    }
  
 }


 export const updateSubSection = async (req,res)=>{
    try{
        const {sectionId,title,timeDuration,description}  = req.body

    const vedioFile =req.files.vedioFile
    console.log(sectionId)
      console.log(title)
      console.log(timeDuration)
      console.log(description)
            console.log(vedioFile)
    if(!sectionId||!title||!timeDuration||!description||!vedioFile){
        return res.status(404).json({
            message:"data is undefined "
        })
    }

     const  uploadDetails= await  imageUploadToCloudinary(process.env.FOLDER_NAME, vedioFile)

     const newSubSection = await SubSections.findByIdAndUpdate({_id:sectionId},
                                                {title:title,
                                                    description:description,
                                                    timeDuration:timeDuration,
                                                    vedioFile: uploadDetails.secure_url
                                                },
                                                {new:true}

     )
     console.log()
     return res.status(200).json({
        message:"updated complete section successfully ",
        data:newSubSection
     })
    }catch(error){
            res.status(500).json({
                message:"somthing went wrong while updating subsection"
            })
    }
 }


  export const deleteSunSection = async (req,res)=>{
    try{
         const {subSectionId,sectionId}=req.body
    if(!subSectionId||!sectionId){
        return res.status(404).json({
            message:"data is not defined "
        })
    }
    const deleteSubSection = await SubSections.findOneAndDelete({_id:subSectionId})
    const updateSection =await Section.findByIdAndUpdate({_id:sectionId},
                                                        {$pull:{subSection:deleteSubSection._id}},
                                                        {new:true}
    )
    return res.status(200).json({
        message:"deleted successfully"
    })
    }catch(error){
        return res.status(500).json({
            message:"error occured while deleting the sunsection",
            error:error.message
        })
    }
   

 }