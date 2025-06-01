import mongoose, { Schema } from "mongoose";
export interface ISizeModel extends Document {
  name: string;
  description: string;
}

const SizeSchema = new mongoose.Schema(
  {
    name: {
      type: Array,
      required: [true, "Size name is required"]
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Size =
  mongoose.models.Size || mongoose.model<ISizeModel>("Size", SizeSchema);
