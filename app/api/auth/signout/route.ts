import connectDB from "@/app/dbConfig/DbConnection";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export const POST = async (request: NextRequest) => {
  try {
    const { _id } = await request.json();
    await User.findByIdAndUpdate(_id, {
      $set: {
        refreshToken: null,
        isVerfied: false
      }
    });

    const response = NextResponse.json({
      status: 200,
      success: true,
      message: "user logout successfully"
    });
    response.cookies.set("accessToken", "");
    response.cookies.set("loggedInUser", "");
    response.cookies.set("refreshToken", "");
    return response;
  } catch {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error"
    });
  }
};
