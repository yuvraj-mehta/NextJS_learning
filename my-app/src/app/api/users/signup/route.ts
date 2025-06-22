import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { log } from "console";
import { sendEmail } from "@/helpers/mailer";



connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {username, email, password} = reqBody;
    console.log("Creating user with details:");

    // Check if all fields are provided
    if (!username || !email || !password) {
      return NextResponse.json({error: "All fields are required"}, {status: 400});
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    console.log("Checking if user already exists:", email);
    

    if (user) {
      return NextResponse.json({error: "User already exists"}, {status: 400});
    }
    console.log("User does not exist, proceeding to create a new user:", email);
    
    
    

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log("Password hashed successfully");
    

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })
    console.log("New user object created:", newUser);
    

    const savedUser = await newUser.save();console.log();
    console.log("User saved successfully:", savedUser);
    

    await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});
    console.log("Verification email sent to:", email);
    
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    })


  } catch (error: any) {
    return NextResponse.json({error: error.message, }, {status: 500});
  }
}