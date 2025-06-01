import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/dbConfig/DbConnection";
import { Category } from "@/app/models/category.model";
import { generateSlug } from "@/app/helpers/generateSlug";
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
    const body = await req.json();
    const { name, description } = body;
    const existingCategory = await Category.findOne({ name: name.trim() });
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
