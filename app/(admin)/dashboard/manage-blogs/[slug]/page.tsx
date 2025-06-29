"use client";
import BlogDetails from "@/components/Bogs/BlogDetails";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { useGetBlogByIdQuery } from "@/features/blogs/BlogAPI";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { data, isLoading } = useGetBlogByIdQuery(slug);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      {isLoading ? (
        <LoadingScreen />
      ) : data?.blog ? (
        <BlogDetails blog={data.blog} />
      ) : (
        <p className="text-center text-gray-500">Blog not found.</p>
      )}
    </div>
  );
};

export default page;
