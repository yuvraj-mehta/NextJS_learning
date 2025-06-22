import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { log } from "console";
import jwt from "jsonwebtoken";


connect();


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = await reqBody;

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare provided password with stored hashed password
    const validPassword = await bcryptjs.compare(password, user.password);

    // If password is valid, return user data (excluding password)
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      name: user.name
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

    const response = NextResponse.json({
      message: "Login successful",
      success: true
    })

    response.cookies.set("token",token, {
      httpOnly: true,
    })

    return response;

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/users/login:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}