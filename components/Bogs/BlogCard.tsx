import { IBlog } from "@/interfaces/product.interface";
import {
  Calendar,
  DatabaseBackup,
  Pencil,
  PencilIcon,
  PencilLine,
  User
} from "lucide-react";
import Link from "next/link";
import React from "react";
interface IBlogCard {
  blogs: IBlog;
}
const BlogCard = ({ blogs }: IBlogCard) => {
  return (
    <div
      className={`relative group hover:cursor-pointer min-w-[2vmin] group mt-0 bg-white rounded-lg shadow-md hover:bg-slate-50 duration-300 flex flex-col`} // <-- add `flex flex-col`
    >
      <div className="w-full h-[40vmin] overflow-hidden">
        <img
          src={blogs.thumbnail}
          alt={blogs._id}
          className="w-full rounded-t-lg h-full object-center transition-transform duration-500 ease-in-out transform group-hover:rotate-3 group-hover:scale-110"
        />
      </div>
      <div className="flex justify-between items-center mt-2 px-2">
        <p className="text-sm flex gap-2 items-center text-gray-700">
          <span>
            <Calendar size={15} />{" "}
          </span>
          <span>{new Date(blogs.createdAt).toDateString()}</span>
        </p>
        <p className="text-sm underline flex gap-2 items-center text-gray-700">
          <span>
            <PencilLine size={15} />{" "}
          </span>
          <span>written by {blogs.auther}</span>
        </p>
      </div>
      <div className="py-1 px-2">
        <Link href={`blogs/${blogs.slug}`}>
          <p className="mt-3 tracking-wider text-black text-md font-semibold group-hover:underline hoverEffect">
            {blogs.title}
          </p>
        </Link>
        {/* <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3">
          {blogs.content.map((item, index) => item)}
        </p> */}
      </div>

      <div className="flex justify-end items-center py-3 px-2 mt-auto">
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
