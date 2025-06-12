"use client";
import Container from "@/components/Container";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const params = useParams();
  const slug = params?.slug as string;
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
