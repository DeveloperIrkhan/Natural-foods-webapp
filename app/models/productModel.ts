import mongoose, { Document } from "mongoose";

export interface IProductModel extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  slug: string;
  category: string;
  productStatus: string;
  inStock: boolean;
}

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    images: { type: [String], default: [], required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"]
    },
    productStatus: { type: String, default: "new arrival", required: true },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product ||
  mongoose.model<IProductModel>("Product", ProductSchema);

export default Product;
