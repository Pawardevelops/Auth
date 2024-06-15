import { getDataFromToken } from "@/dbConfig/delDataFromToken";
import User from "@/models/userModel";
import {NextResponse } from "next/server";

const { connect } = require("@/dbConfig/dbConfig");

connect()

export async function POST(req){
    try{
        const userId = getDataFromToken(req);
        const user = await User.findOne({ _id: userId }).select("-password").lean(); // Use .lean() to convert to plain JS object
        
        return NextResponse.json({
            message:"user found",
            data: user
        })
    }
    catch(err){
        return NextResponse.json({error:err.message},{status:500 })
    }
}