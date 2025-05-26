import mongoose, { Document } from "mongoose";

export interface IProductModel extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

const ProducrtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product ||
  mongoose.model<IProductModel>("Product", ProducrtSchema);

export default Product;
