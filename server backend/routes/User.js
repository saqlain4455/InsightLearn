import { SignUp,login,sendOtp,getUsersInfo } from "../controllers/Auth.js"

import express from "express"




const Router =express.Router()

Router.post("/Signup",SignUp)
Router.post("/Login",login)
Router.post("/sendotp",sendOtp)
Router.post("/userinfo",getUsersInfo)


export default Router

