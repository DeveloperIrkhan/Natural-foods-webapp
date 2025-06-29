import { IBlog } from "@/interfaces/product.interface";
import { Calendar, PencilLine } from "lucide-react";
import React from "react";
interface IBlogDetails {
  blog: IBlog;
}
const BlogDetails = ({ blog }: IBlogDetails) => {
  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {blog.title}
        </h1>
        <div className="flex mb-4 gap-3">
          <div className="flex items-center gap-2">
            <span>
              <PencilLine size={15} />
            </span>
            <span className="text-sm text-gray-500">
              Written by{" "}
              <span className="font-medium text-gray-700">{blog.auther}</span>
            </span>
            <span>|</span>
          </div>

          <div className="flex items-center gap-2">
            <span>
              <Calendar size={15} />
            </span>

            <span className="text-sm text-gray-500 ">
              {blog.createdAt
                ? new Date(blog.createdAt).toDateString()
                : "Loading date..."}
            </span>
          </div>
        </div>

        <img
          src={blog.thumbnail}
          alt="Blog Thumbnail"
          className="w-full h-94 object-cover rounded-md mb-6"
        />
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {blog.content.map((item, index) => (
            <p key={index} className="text-base md:text-lg">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
