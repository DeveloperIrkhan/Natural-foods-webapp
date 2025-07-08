import { IOrderModel } from "@/interfaces/product.interface";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    userInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      contact: { type: String, required: true }
    },
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    paymentStatus: { type: String, default: "pending" }
  },
  {
    timestamps: true
  }
);

const Order =
  mongoose.models.Order || mongoose.model<IOrderModel>("Order", OrderSchema);
