import { updateProfile,deleteDetails,chageProfileImage } from "../controllers/Profile.js";
import { resetPassword, resetPasswordToken } from "../controllers/ResetPasword.js"
import {updatePassword} from "../controllers/Auth.js"
import { auth } from "../middleware/verify.js";
import { contactus } from "../controllers/Contact.js";
import express from "express"
const Router =express.Router()

Router.put("/updateProfile",auth,updateProfile)
Router.put("/updateProfilePicture",auth,chageProfileImage)
Router.delete("/deleteuser",deleteDetails)
Router.post("/resetPassword",resetPassword)
Router.post("/reset-password-token",resetPasswordToken)
Router.post("/chagePassword",updatePassword)
Router.post("/send",contactus)

export default Router