    import { v2 as cloudinary } from 'cloudinary';
    import path from 'path';
 export const imageUploadToCloudinary= async (folder,file,height,quality)=>{
        const options ={folder}
        if(quality){
            options.quality=quality
        }
        if(height){
            options.height=height
        }
        options.resource_type="auto"
         
const filePath = path.resolve(file.tempFilePath).replace(/\\/g, "/");
return cloudinary.uploader.upload(filePath, options);


}