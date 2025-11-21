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


 export const updateSubSection = async (req, res) => {
    try {
        const { sectionId, title, timeDuration, description } = req.body;
        const vedioFile = req.files?.vedioFile; // optional chaining in case files are undefined

        console.log(sectionId, title, timeDuration, description, vedioFile);

        if (!sectionId || !title || !timeDuration || !description || !vedioFile) {
            return res.status(404).json({
                message: "Data is undefined"
            });
        }

        // Check file size (5 MB = 5 * 1024 * 1024 bytes)
        const maxSize = 5 * 1024 * 1024;
        if (vedioFile.size > maxSize) {
            return res.status(400).json({
                message: "Video file should not be more than 5 MB"
            });
        }

        const uploadDetails = await imageUploadToCloudinary(process.env.FOLDER_NAME, vedioFile);

        const newSubSection = await SubSections.findByIdAndUpdate(
            { _id: sectionId },
            {
                title: title,
                description: description,
                timeDuration: timeDuration,
                vedioFile: uploadDetails.secure_url
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Updated subsection successfully",
            data: newSubSection
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong while updating subsection"
        });
    }
};



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