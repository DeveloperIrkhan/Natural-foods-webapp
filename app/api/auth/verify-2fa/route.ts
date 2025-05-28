import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";
import connectDB from "@/app/dbConfig/DbConnection";

connectDB();
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { email, token } = body;

  const user = await User.findOne({ email });
  if (!user || !user.twoFactorSecret) {
    return NextResponse.json({
      success: false,
      message: "2FA not setup for this user"
    });
  }

  const isVerified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
    window: 1 // 30-sec window
  });

  if (!isVerified) {
    return NextResponse.json({
      success: false,
      message: "Invalid or expired token"
    });
  }

  user.isTwoFactorEnabled = true;
  user.isVerfied = true;
  await user.save();
  return NextResponse.json({
    success: true,
    verified: true,
    message: "2FA verified successfully"
  });

  // after checking email/password
  // if (user.isTwoFactorEnabled) {
  //   return NextResponse.json({
  //     success: true,
  //     requiresTwoFactor: true,
  //     message: "2FA required",
  //     userId: user._id, // or email
  //   });
  // }
};
