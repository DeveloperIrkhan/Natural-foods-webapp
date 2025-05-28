import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/dbConfig/DbConnection";
import User from "@/app/models/userModel";
import { comparePassword } from "@/app/helpers/passwordMatcher";
import { generateAccessAndRefreshToken } from "@/app/helpers/genterateTokens";

connectDB();
export const POST = async (request: NextRequest) => {
  try {
    const responsereqBody = await request.formData();
    const email = responsereqBody.get("email") as string;
    const password = responsereqBody.get("password") as string;
    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "please enter both email and password"
      });
    }

    const existedUser = await User.findOne({ email });
    //checking password matching
    const isPasswordMatched = await comparePassword(
      password,
      existedUser.password
    );
    if (!isPasswordMatched) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "password is not matched"
      });
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      existedUser._id
    );
    const loggedInUser = await User.findById(existedUser._id).select(
      "-password -refreshToken"
    );
    await User.findByIdAndUpdate(
      existedUser._id,
      { $set: { refreshToken } },
      { new: true }
    );
    const response = NextResponse.json({
      status: 200,
      success: true,
      message: "user login successfully",
      loggedInUser
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 3 // 3 hour
    });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 2 // 1 hour
    });
    response.cookies.set("loggedInUser", loggedInUser, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 2 // 1 hour
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "error while posting data",
      error
    });
  }
};
