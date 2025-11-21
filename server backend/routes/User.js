import { SignUp,login,sendOtp,getUsersInfo,updateUser } from "../controllers/Auth.js"
import { auth } from "../middleware/verify.js"
import express from "express"




const Router =express.Router()

Router.post("/Signup",SignUp)
Router.post("/Login",login)
Router.post("/sendotp",sendOtp)
Router.post("/userinfo",getUsersInfo)
Router.post("/userupdate",auth,updateUser)

export default Router

