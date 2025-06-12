import mongoose, { Document } from "mongoose";
export interface IProductModel extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  images: string[];
  slug: string;
  category: string;
  productStatus: string;
  inStock: boolean;
  createdAt:Date;
  
}

export interface ICategoryModel extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
}
