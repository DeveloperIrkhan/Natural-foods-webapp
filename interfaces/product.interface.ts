import mongoose, { Document } from "mongoose";
export interface IProductModel extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  images: string[];
  // quantity: string[];
  slug: string;
  category: string;
  productStatus: string;
  inStock: boolean;
  createdAt: Date;
}

export interface ICategoryModel extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
}
export interface IBlogsModel extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  content: string[];
  auther: string;
  thumbnail: string;
  createdAt: Date;
}

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  content: string[];
  auther: string;
  thumbnail: string;
  createdAt: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  images: string[];
  // quantity: string[];
  slug: string;
  category: string;
  productStatus: string;
  inStock: boolean;
  createdAt: Date;
}

export interface IOrderModel extends Document {
  _id: mongoose.Types.ObjectId;
  products: {
    productId: string;
    quantity: string;
  }[];
  userInfo: {
    name: string;
    email: string;
    contact: string;
  };
  totalAmount: number;
  shippingAddress: string;
  paymentStatus: string;
}
export interface IOrder {
  _id: string;
  products: {
    productId: string;
    quantity: string;
  }[];
  userInfo: {
    name: string;
    email: string;
    contact: string;
  }[];
  totalAmount: number;
  shippingAddress: string;
  paymentStatus: string;
}
