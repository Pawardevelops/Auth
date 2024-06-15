import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

connect()
export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { password, token } = reqBody;
        
        // Find the user with the provided token
        const existingUser = await User.findOne({ forgotPasswordToken: token });
        
        // Check if the user does not exist
        if (!existingUser) {
            return NextResponse.json(
                { message: "User doesn't exist", success: false },
                { status: 400 }
            );
        }
        if(!existingUser.isVerified){
            return NextResponse.json({message:"user not verified"},{success:false},{status:400})
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        console.log("password")

        // Update the user's password and clear the token fields
        existingUser.password = hashedPassword;
        existingUser.forgotPasswordToken = undefined;
        existingUser.forgotPasswordTokenExpiry = undefined;
        await existingUser.save();

        // Return success response
        return NextResponse.json({ message: "Password changed successfully", success: true });
    } catch (err) {
        console.error("Error processing request:", err);
        return NextResponse.json({ message: "Error processing request", error: err.message }, { status: 500 });
    }
}
