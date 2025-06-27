"use client";
import React, { useEffect } from "react";
import Container from "../Container";
import BlogCard from "./BlogCard";
import PageTitle from "../PageTitle";
import { useGetBlogsQuery } from "@/features/blogs/BlogAPI";

const BlogSection = () => {
  const { data: response, isLoading, error } = useGetBlogsQuery();

  useEffect(() => {
    console.log(response);
  }, [response]);
  return (
    <Container className="m-5 py-5">
      <PageTitle className="text-black text-xl">Our Latest Blogs</PageTitle>
      <hr />
      <div className="mt-5 grid md:grid-cols-4 grid-cols-1 justify-center gap-4">
        {response?.blogs?.map((blog, index) => (
          <BlogCard key={index} blogs={blog} />
        ))}
      </div>
    </Container>
  );
};

export default BlogSection;
