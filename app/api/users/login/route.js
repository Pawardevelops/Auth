import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const { connect } = require("@/dbConfig/dbConfig");


connect()

export async function POST(req){
    try{
        const reqBody =await req.json();
        const {email,password} = reqBody;
        console.log(reqBody)

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({message:"User does not exits"},{status:500});

        }
        if(!user.isVarified){
            return NextResponse.json({message:"user Not Verified"},{status:400});
        }
        const validPassword = await bcryptjs.compare(password,user.password);
        
        if(!validPassword){
            return NextResponse.json({error:"Check your credentials"},{status:400});
            }
            
            const tokenData =  {
                id: user._id,
                username:user.username,
                email:user.email
                }
                
                console.log(process.env.TOKEN_SECRET,"env")
                const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:'1d'});
                const response = NextResponse.json({
                    message:"Logged In success",
                    success:true
                    })
        response.cookies.set("token",token,{httpOnly:true})

        return response;
    }
    catch(err){
        return NextResponse.json({error:err.message},{status:500})
    }
}