"use client";
import Container from "@/components/Container";
import React, { useEffect } from "react";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}
const page = async ({ params }: ProductDetailsPageProps) => {
  const { slug } = params;
  useEffect(() => {
    console.log("slug", slug);
  }, [slug]);
  return (
    <Container>
      <p>i'm passing this id :{slug} here</p>
    </Container>
  );
};

export default page;
