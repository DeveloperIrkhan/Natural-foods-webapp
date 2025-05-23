import { NextRequest } from "next/server";
import connectDB from "@/app/DatabaseConnection/DbConnection";
import Product from "@/app/models/product";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const product = await Product.find();
    console.log(product);
    return Response.json({
      success: true,
      message: "product fetched",
      product
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "product fetching error"
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const product = await req.json();
    const newProduct = new Product(product);
    await newProduct.save();
    return Response.json({
      success: true,
      message: "product added successfully",
      product: newProduct
    });
  } catch (error: any) {
    console.log(error.message);
    console.log(error.stack);
    return Response.json(
      {
        success: false,
        message: "product not added error"
      },
      { status: 500 }
    );
  }
}
