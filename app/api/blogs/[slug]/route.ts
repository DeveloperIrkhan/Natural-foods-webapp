import connectDB from "@/app/dbConfig/DbConnection";
import { Blogs } from "@/app/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectDB();
  try {
    const blog = await Blogs.findOne({slug: params.slug});
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching blog" },
      { status: 500 }
    );
  }
}
