import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbconfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findOne({_id: userId}).select("-password");

    return NextResponse.json({
      message: "User data fetched successfully.",
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching user data." },
      { status: 500 }
    );
  }
}