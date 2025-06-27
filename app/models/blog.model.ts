import { IBlogsModel } from "@/interfaces/product.interface";
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: [String], default: [], required: true },
    auther: { type: String, required: true },
    thumbnail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Blogs =
  mongoose.models.Blogs || mongoose.model<IBlogsModel>("Blogs", BlogSchema);
