import { NextRequest } from "next/server";
import connectDB from "@/app/dbConfig/DbConnection";
import Product from "@/app/models/productModel";
import { uploadOnCloudinary } from "@/app/helpers/cloudinaryUpload";
import { generateSlug } from "@/app/helpers/generateSlug";
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
    const productStatus = formData.get("productStatus") as string;
    const price = parseFloat(formData.get("price") as string);
    const discountPrice = parseFloat(formData.get("discountPrice") as string);
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
    //creating slugs
    const existingProducts = await Product.find({}, "slug").lean();
    // .lean() for plain JS objects, faster
    const existingProductSlugs = existingProducts.map((p) => p.slug);
    const createdSlug: string = generateSlug({
      name,
      existingSlugs: existingProductSlugs
    });
    // console.log("createdSlug", createdSlug);
    const newProduct = new Product({
      name,
      description,
      price,
      discountPrice: discountPrice,
      category,
      slug: createdSlug,
      images: ImageArray,
      productStatus,
      inStock
    });
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
