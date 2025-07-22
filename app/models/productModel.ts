import { IProductModel } from "@/interfaces/product.interface";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: false, default: 0 },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    images: { type: [String], default: [], required: true },
    // quantity: { type: [String], required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"]
    },
    productStatus: { type: String, default: "new arrival", required: true },
    inStock: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product ||
  mongoose.model<IProductModel>("Product", ProductSchema);

export default Product;
