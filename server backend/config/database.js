import mongoose  from "mongoose";

export  const databaseConnected=  ()=>{
        mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        .then(()=>{
            console.log("connected successfully")
        }).catch((error)=>{
                console.log("db is not connected ")
                console.error(error)
                process.exit(1)
        })
}