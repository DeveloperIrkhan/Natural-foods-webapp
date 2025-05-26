import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";
import connectDB from "@/app/dbConfig/DbConnection";

await connectDB();
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { email } = body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "User not found"
    });
  }

  //generating OTP
  const secret = speakeasy.generateSecret({
    name: `KhalisFoods (${email})`
  });

  //saving base32 to DB
  existingUser.twoFactorSecret = secret.base32;
  await existingUser.save();

  // Generate QR code for user to scan in Google Authenticator
  const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url || "");
  return NextResponse.json({
    success: true,  
    message: "2FA setup initiated",
    qrCode: qrCodeDataURL,
    manualCode: secret.base32 // in case user wants to enter manually
  });
};
