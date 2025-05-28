import fs from "fs/promises";
import { NextRequest } from "next/server";
import connectDB from "@/app/dbConfig/DbConnection";
import Product from "@/app/models/productModel";
import { uploadOnCloudinary } from "@/app/helpers/cloudinaryUpload";
import path from "path";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const product = await Product.find();
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
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const inStockRaw = formData.get("inStock") as string;
    const inStock = inStockRaw === "true"; // convert from string

    const ImageArray: string[] = [];
    for (let i = 0; i <= 4; i++) {
      const file = formData.get(`productImage${i}`) as File;
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        let result = await uploadOnCloudinary(buffer, file.name);
        if (result?.url) {
          ImageArray.push(result.url);
        }
      }
    }
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images: ImageArray,
      inStock
    });
    const savingProduct = new Product(newProduct);
    await savingProduct.save();
    return Response.json({
      success: true,
      message: "product added successfully",
      product: savingProduct
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
