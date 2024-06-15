import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connect();

export async function POST(req) {
  try {
    console.log("signup route");
    
    // Parse the request body
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    
    // Basic validation (you can enhance this further)
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    console.log(hashedPassword, "hashedPassword");
    console.log(savedUser._id, "user id");

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully.",
      success: true,
      savedUser,
    });
  } catch (err) {
    console.error(err);

    // Handle different types of errors
    if (err.name === 'ValidationError') {
      return NextResponse.json({ error: "Validation failed", details: err.errors }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal server error", details: err.message }, { status: 500 });
  }
}
