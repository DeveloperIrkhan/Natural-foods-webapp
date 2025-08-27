import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/dbConfig/DbConnection";
import { Category } from "@/app/models/category.model";
import { generateSlug } from "@/app/helpers/generateSlug";
import { uploadOnCloudinary } from "@/app/helpers/cloudinaryUpload";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const categories = await Category.find({});
    return NextResponse.json(
      {
        success: true,
        message: "categories fetched",
        categories
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching categories"
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
    const categoryImage = formData.get("categoryImage") as File;
    console.log("name", name);
    console.log("description", description);
    console.log("categoryImage", categoryImage);
    const existingCategory = await Category.findOne({
      name: name
    });

    console.log(existingCategory);
    if (existingCategory) {
      return NextResponse.json({
        success: true,
        message: "Category is already existed",
        name
      });
    }
    const existingCategorySlugs = await Category.find({}, "slug").lean();
    // .lean() for plain JS objects, faster
    const existingProductSlugs = existingCategorySlugs.map((p) => p.slug);
    const createdSlug: string = generateSlug({
      name,
      existingSlugs: existingProductSlugs
    });

    //saving iamge into cloudinary

    if (categoryImage) {
      const _buffer = Buffer.from(await categoryImage.arrayBuffer());
      const _cloudnaryResp = await uploadOnCloudinary(
        _buffer,
        categoryImage.name
      );

      const newCategory = await Category.create({
        name,
        slug: createdSlug,
        description,
        categoryImage: _cloudnaryResp?.url
      });

      return NextResponse.json({
        success: true,
        message: "Category added successfully",
        newCategory
      });
    }
    const newCategory = await Category.create({
      name,
      slug: createdSlug,
      description
    });

    return NextResponse.json({
      success: true,
      message: "Category added successfully",
      newCategory
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create category",
        error: error instanceof Error ? error.message : error
      },
      { status: 500 }
    );
  }
}
