import mongoose from "mongoose";


export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL) 
        const connection = mongoose.connection 

        connection.on("connected",()=>{
            console.log("MongoDb Connected")
        })
        connection.on("error",(err)=>{
            console.log("Error Connecting Db : ",err)
            process.exit();
        })
    }
    catch(error){
        console.log("something went wrong in connecting to Db",error);
    }
}