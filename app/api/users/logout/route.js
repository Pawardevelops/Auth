import { NextResponse } from "next/server";

const { connect } = require("@/dbConfig/dbConfig");

connect()

export async function POST(req){
    try{
        const response = NextResponse.json({
            message:"logout successfully",
            success:true
        })

        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)})
        return response;
    }
    catch(err){
        return NextResponse.json({error:err.message},{status:500})
    }
}