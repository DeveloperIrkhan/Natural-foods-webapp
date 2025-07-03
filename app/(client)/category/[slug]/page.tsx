"use client";
import Container from "@/components/Container";
import FiteredProductContainer from "@/components/our-shop/FiteredProductContainer";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import { useParams } from "next/navigation";

const FilterByCategory = () => {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <div className="bg-gray-50">
      <Container className="w-full h-screen">
        <PageTitle>Category wise</PageTitle>
        <FiteredProductContainer slug={slug} />
      </Container>
    </div>
  );
};

export default FilterByCategory;
