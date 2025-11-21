import express from "express"
import dotenv from "dotenv"
import { databaseConnected } from "./config/database.js"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import cors from "cors";
import getCourseRoutes from "./routes/Course.js"
import getUserRoutes from "./routes/User.js"
import getProfileRoute from "./routes/Profile.js"
import { connectCloudinary } from "./config/cloudinary.js"

dotenv.config()
const app=express()
const PORT = process.env.PORT||4000


databaseConnected()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "https://insightlearn-1.onrender.com"], 
    credentials: true
}));


app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});
connectCloudinary()

app.use("/api/v1/course",getCourseRoutes)
app.use("/api/v1/user",getUserRoutes)
app.use("/api/v1/Profile",getProfileRoute)


app.use("/",(req,res)=>{
        res.json({
            message:"server is up and running "
        })
})

app.listen(PORT,()=>{
    console.log("i am listening at 4000")
})
