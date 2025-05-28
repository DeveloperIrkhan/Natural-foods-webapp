import User from "../models/userModel";
import jwt, { SignOptions } from "jsonwebtoken";

const generateAccessToken = (id: string): string => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) throw new Error("ACCESS_TOKEN_SECRET is not defined.");
  const options: SignOptions = {
    expiresIn: "3h"
  };
  return jwt.sign({ id }, secret, options);
};
const generateRefreshToken = (id: string): string => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) throw new Error("REFRESH_TOKEN_SECRET is not defined.");
  const options: SignOptions = {
    expiresIn: "2d"
  };
  return jwt.sign({ id }, secret, options);
};

export const generateAccessAndRefreshToken = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("user not found");
    } else {
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { refreshToken, accessToken };
    }
  } catch (error) {
    throw error;
  }
};
