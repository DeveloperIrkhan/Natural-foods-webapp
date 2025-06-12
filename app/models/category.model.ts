import { ICategoryModel } from "@/interfaces/product.interface";
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields automatically
  }
);

export const Category =
  mongoose.models.Category ||
  mongoose.model<ICategoryModel>("Category", CategorySchema);
