import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/dbConfig/DbConnection";
import { hashingPassword } from "@/app/helpers/authHelper";
import User from "@/app/models/userModel";
import { uploadOnCloudinary } from "@/app/helpers/cloudinaryUpload";
import path from "path";
connectDB();
export const POST = async (request: NextRequest) => {
  try {
    //if i send data in json format then use this
    // const responsereqBody = await request.json();
    //if i send data n formdata then use this
    const responsereqBody = await request.formData();
    // console.log("responsereqBody", responsereqBody);
    const name = responsereqBody.get("name") as string;
    const email = responsereqBody.get("email") as string;
    const password = responsereqBody.get("password") as string;
    const file = responsereqBody.get("avator") as File;
    //checking already existed
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: "this user already existed"
      });
    }
    //creating hashing password
    const hashedPassword = await hashingPassword(password);
    // console.log("hashedPassword", hashedPassword);

    // Save file to local folder
    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    // replace spaces with dashes
    const baseName = file.name.split(".")[0].replace(/\s+/g, "-");
    const fileName = `${baseName}-${timestamp}.${fileExtension}`;
    // Create directory if not exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);
    // if avator then upload it to cloundinary and save path in database
    const response = await uploadOnCloudinary(filePath);
    // console.log("response", response);
    //creating user
    const newUser = await User.create({
      name: name,
      email,
      password: hashedPassword,
      avatorUrl: response?.url
      
    });
    // checking for user creating if not then create a new user and send a response back to frontend
    if (!newUser) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Error while creating new user"
      });
    }
    // removing password and refresh token form response
    const createdUser = await User.findById(newUser._id).select(
      "-password -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry"
    );
    // const saveUser = await newUser.save();
    //if user saved then we have to send email on his mail for verification

    return NextResponse.json({
      status: 200,
      success: true,
      message: "new user saved",
      createdUser
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "error while posting data",
      error
    });
  }
};
