
import Otp from "../models/Otp.js"
import User from "../models/User.js"
import otpgenerator from "otp-generator"
import jwt from "jsonwebtoken"
import sendMailer from "../utils/mail.js"
import bcrypt from "bcrypt";
import ProfileUser from "../models/Profile.js"

 export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({ message: "email is not defined" });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "email already exist" });
    }

    // Generate OTP
    let otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    // Check uniqueness correctly
    let already = await Otp.findOne({ otp });
    while (already) {
      otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      already = await Otp.findOne({ otp });
    }

    // Save OTP
    await Otp.create({
      email: email,
      otp: otp,
    });

    return res.status(200).json({
      message: "otp generated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



 export const SignUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType
    } = req.body;

    // Validate inputs
    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      !accountType
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if user already exists
    const already = await User.findOne({ email });
    if (already) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Validate password
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create profile first
    const profile = await ProfileUser.create({
      gender: null,
      dateofBirth: null,
      about: null,
      contactNumber: null
    });

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profile._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    });

    return res.status(200).json({
      message: "User signed up successfully",
      fullInfo: user
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while signing up",
      error: error.message
    });
  }
};





export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password is undefined"
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(404).json({
        message: "Email is not signed in"
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        accountType: user.accountType
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Remove password before sending user object
    user.password = undefined;

    // Set cookie for cross-origin frontend
    const cookieOptions = {
  httpOnly: true,                         // cannot be accessed by JS
  secure: true,                           // required for HTTPS in production
  sameSite: "none",                       // cross-origin support
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
};

    // Set cookie and send response
    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        token,
        user,
        message: "Logged in successfully"
      });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};






export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword, email } = req.body;

  
    if (!oldPassword || !newPassword || !confirmPassword || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );

    await sendMailer(email, "Password Changed", "Your password has been updated successfully.");

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};






 export const getUsersInfo = async(req,res)=>{
        try{
            const {userId} = req.body
            if(!userId){
                return res.status(400).json({
                    message:"undefined data"
                })
            }
                const response = await User.findOne({_id:userId}).populate("courses")
                console.log(response)
                if(!response){
                    return res.status(400).json({
                        message:"user not found"
                    })
                }
                return res.status(200).json({
                    message:"user found",
                    data:response
                })

        }catch(error){
                return res.status(500).json({
                    message:"somthing went wrong while fetching the data",
                    error:error.message

                })
        }
}




export  const updateUser =  async (req,res)=>{
    try{

    
    const  {courseId} = req.body
    const userId= req.user.id
        console.log(userId)
         console.log(courseId)
    if(!userId||!courseId){
        return res.status(400).json({
            message:"data is undefined "
        })
    }

    const response  =await User.findByIdAndUpdate({_id:userId},
                                                    {$pull:{courses:courseId}}
    )
    console.log(response)

    return res.status(200).json({
        message:"deleted successfully",
        data:response._id
    })
    }catch(error){
        return res.status(500).json({
            message:"error occureed while updating the user ",
            error:error.message
        })
    }

}