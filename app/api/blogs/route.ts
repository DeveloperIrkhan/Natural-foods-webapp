import connectDB from "@/app/dbConfig/DbConnection";
import { generateSlug } from "@/app/helpers/generateSlug";
import { Blogs } from "@/app/models/blog.model";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const blogs = await Blogs.find();
    return Response.json(
      {
        success: true,
        message: "blogs fetched",
        blogs
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "blogs fetching error"
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const auther = formData.get("auther") as string;
    const content = formData.getAll("content") as string[];
    const thumbnail = formData.get("thumbnail") as File;
    //file converting to binnary array
    const bytes = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = Date.now() + "_" + thumbnail.name;
    const uploadFolder = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(uploadFolder, buffer);

    const existingBlogSlug = await Blogs.find({}, "slug").lean();
    // .lean() for plain JS objects, faster
    const existingSlug = existingBlogSlug.map((p) => p.slug);
    const newSlug: string = generateSlug({
      name: title,
      existingSlugs: existingSlug
    });

    const newBlog = await Blogs.create({
      title,
      slug: newSlug,
      content,
      auther,
      thumbnail: `/uploads/${filename}`
    });

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (err) {
    console.error("Error saving blog:", err);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}
