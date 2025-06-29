import { IBlog } from "@/interfaces/product.interface";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  blogs: IBlog;
}
const BlogVerticalCard = ({ blogs }: Props) => {
  return (
    <div
      className="px-2 w-3/4 md:px-4 py-2 md:py-4 bg-white rounded-xl hover:shadow-lg duration-200
   gap-3 shadow-md flex flex-row justify-between items-center"
    >
      <div className="flex">
        <img
          className="h-28 w-28 rounded"
          src={blogs.thumbnail}
          alt="product image"
        />
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2 className="text-[12px] md:text-[14px] md:font-semibold">
          {blogs.title}
        </h2>
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2 className="text-[9px] md:text-[10px] md:font-semibold flex gap-2 items-center">
          written by {blogs.auther}
        </h2>
        <h2 className="text-[9px] md:text-[10px] md:font-semibold flex gap-2 items-center">
          Date by {new Date(blogs.createdAt).toDateString()}
        </h2>
      </div>
      <div className="flex flex-col justify-around items-center"></div>
      <div className="flex flex-row gap-2 justify-around items-center">
        <Edit className="hoverEffect w-4 md:h-5 h-4 md:w-5 text-blue-400 hover:text-blue-600 hover:cursor-pointer" />
        <Trash2 className="hoverEffect w-4 md:h-5 h-4 md:w-5 text-red-400 hover:text-red-600 hover:cursor-pointer" />
        <Link href={`/dashboard/manage-blogs/${blogs.slug}`}>
          <Eye className="hoverEffect w-4 md:h-5 h-4 md:w-5 text-red-400 hover:text-red-600 hover:cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default BlogVerticalCard;
