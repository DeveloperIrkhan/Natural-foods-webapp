import mongoose, { Document } from "mongoose";
export interface IUserModel extends Document {
  name: string;
  isAdmin: boolean;
  email: string;
  isVerfied: boolean;
  password: string;
  avatorUrl: string;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date;
  verifyToken: string;
  verifyTokenExpiry: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "firstname is required!"],
      unique: false,
      lowercase: true,
      trim: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    isVerfied: {
      type: Boolean,
      default: false
    },
    password: { type: String, required: [true, "password is required"] },
    avatorUrl: { type: String, required: false },
    forgotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
    verifyToken: { type: String },
    verifyTokenExpiry: { type: Date },
    twoFactorSecret: {
      type: String
    },
    isTwoFactorEnabled: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
const User =
  mongoose.models.users || mongoose.model<IUserModel>("users", userSchema);

export default User;
