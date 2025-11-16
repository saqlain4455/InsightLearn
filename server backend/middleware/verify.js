import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    try {
      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Error verifying token",
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Auth middleware error",
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



