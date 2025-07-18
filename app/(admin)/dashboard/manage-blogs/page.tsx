"use client";
import BlogVerticalCard from "@/components/Admin/BlogVerticalCard";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { useGetBlogsQuery } from "@/features/blogs/BlogAPI";
import { LucideClockFading } from "lucide-react";
import React from "react";

const page = () => {
  const { data: response, isLoading, error } = useGetBlogsQuery();

  return (
    <div className="flex flex-col items-center gap-3">
      {isLoading && <LoadingScreen />}
      {response?.blogs.map((blog, index) => (
        <BlogVerticalCard key={index} blogs={blog} />
      ))}
    </div>
  );
};

export default page;
