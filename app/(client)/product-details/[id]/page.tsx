"use client"
import Container from "@/components/Container";
import React from "react";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}
const page = async ({ params }: ProductDetailsPageProps) => {
  const { id } = params;
  return (
    <Container>
      <p>i'm passing this id :{id} here</p>
    </Container>
  );
};

export default page;
