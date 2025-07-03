"use client";
import React, { useEffect } from "react";
import Container from "../Container";
import BlogCard from "./BlogCard";
import PageTitle from "../PageTitle";
import { useBlogsStore } from "@/features/blogs/blogStore";

const BlogSection = () => {
    const { blogs } = useBlogsStore();
  

  useEffect(() => {
    // console.log("blogs",blogs);
  }, [blogs]);
  return (
    <Container className="m-5 py-5">
      <PageTitle className="text-black text-xl">Our Latest Blogs</PageTitle>
      <hr />
      <div className="mt-5 grid md:grid-cols-4 grid-cols-1 justify-center gap-4">
        {blogs?.map((blog, index) => (
          <BlogCard key={index} blogs={blog} />
        ))}
      </div>
    </Container>
  );
}
export default BlogSection;
