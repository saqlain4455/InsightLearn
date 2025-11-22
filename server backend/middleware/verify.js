import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    // Correct way: cookie contains the token directly
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("Token from cookie:", token);

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};


 


 export const isStudent= async (req,res,next)=>{
    try{
        const user=req.user
        if(!user){
            return  res.json({
                message:"no user data "
            })
        }

        if(user.accountType==="Student"){
            return next()
        
             
        }else{
           return   res.json({
                message:"you are not allowed "
            })
        }
    }catch(error){
            res.status(500).json({
                message:"error checking the authoization"
    })
    }
   
}

export const isAdmin= async (req,res,next)=>{
    try{
            const user=req.user
        if(!user){
            return  res.status(404).json({
                message:"no user data "
            })
        }

        if(user.accountType==="Admin"){
            return next()
        }else{
             return res.status(400).json({
                message:"you are not allowed "
            })
        }
    }catch(error){
            return  res.status(500).json({
                message:"somthing went wrong here "
            })
    }
   
}




  export const isInstructor= async (req,res,next)=>{
    try{
        const user=req.user
       
        if(!user){
            return  res.status(400).json({
                message:"no user data "
                
            })
        }

        if(user.accountType==="Instructer"){
           return next()
        }else{
             return res.status(500).json({
                message:"you are not allowed "
            })
        }
    }catch(error){
            return  res.json({
                message:"something went wrong here "
            })
    }
    
}



