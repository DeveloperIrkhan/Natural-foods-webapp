"use client";
import BlogCard from "@/components/Bogs/BlogCard";
import Container from "@/components/Container";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import PageTitle from "@/components/PageTitle";
import { useBlogsStore } from "@/features/blogs/blogStore";
import React, { useState } from "react";

const page = () => {
  const { blogs } = useBlogsStore();

  return (
    <Container className="m-5">
      <PageTitle>Our Blogs</PageTitle>

      <div className="mt-5 grid md:grid-cols-4 grid-cols-1 justify-center gap-4">
        {blogs?.map((blog, index) => (
          <BlogCard key={index} blogs={blog} />
        ))}
      </div>
    </Container>
  );
};

export default page;
