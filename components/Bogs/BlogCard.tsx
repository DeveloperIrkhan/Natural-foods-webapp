import { IBlog } from "@/interfaces/product.interface";
import Link from "next/link";
import React from "react";
interface IBlogCard {
  blogs: IBlog;
}
const BlogCard = ({ blogs }: IBlogCard) => {
  return (
    <div
      className={`relative min-w-[2vmin] group mt-0 bg-white rounded-lg shadow-md hover:bg-slate-50 duration-300`}
    >
      <div className="w-full h-[40vmin] overflow-hidden">
        <img
          src={blogs.thumbnail}
          alt={blogs._id}
          className="w-full rounded-t-lg h-full object-center transition-transform duration-500 ease-in-out transform group-hover:rotate-3 group-hover:scale-110"
        />
      </div>
      <div className="py-1 px-2">
        <p className="text-center my-3 text-black text-sm font-semibold tracking-wide">
          {blogs.title}
        </p>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {blogs.content.map((item, index) => item)}
        </p>
      </div>
      <div className="flex justify-between items-center py-3 px-2">
        <p className="text-sm text-gray-700"> {new Date(blogs.createdAt).toDateString()}</p>
        <Link
          href={`blogs/${blogs.slug}`}
          className="bg-primary-color hoverEffect hover:bg-secondary-color rounded-md px-3 py-2 text-white"
        >
          read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
