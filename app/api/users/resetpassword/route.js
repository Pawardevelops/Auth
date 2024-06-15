import User from "@/models/userModel";
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";

const { connect } = require("@/dbConfig/dbConfig");


connect()

export async function POST(req){
    try{
        console.log("request ")
        const reqBody = await req.json();
        const {email} = reqBody;
        console.log(reqBody,"reqBod")

        const user = await User.findOne({email:email})
        
        if(!user){
            console.log("user not found")
            return NextResponse.json({message:"Invalid token"},{status:400})
        }
        console.log(email,user._id,"before");
        
        await sendEmail({ email, emailType: "RESET", userId: user._id });

        console.log("after");

        return NextResponse.json({message:"Link has been sent to your Email",success:true},{status:200})
    }
    catch(err){
        return NextResponse.json({message:err.message},{status:500})
    }
}