import User from "@/models/userModel";
import { NextResponse } from "next/server";

const { connect } = require("@/dbConfig/dbConfig");


connect()

export async function POST(req){
    try{
        
        const reqBody = await req.json();
        const {token} = reqBody;
        console.log(token,"TOKEN");

        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
        
        if(!user){
            const tokenExpiredUser = await User.findOne({verifyToken:token});
                if(tokenExpiredUser){
                    await User.deleteOne({verifyToken:token})
                    return NextResponse.json({message:"Token expired, SignIn Again"},{status:400});
                }
            return NextResponse.json({message:"Invalid token"},{status:400})

        }
        console.log(user,"use");

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message:"Email verified successfully",success:true},{status:200})
    }
    catch(err){
        return NextResponse.json({message:err.message},{status:500})
    }
}