"use client"
import React from "react";
import Container from "../Container";
import PageTitle from "../PageTitle";
import CategoriesCard from "./CategoriesCard";
import { useCategoryStore } from "@/features/category/categoryStore";

const HomeCategories = () => {
  const { categories } = useCategoryStore();
  return (
    <div>
      <Container className="m-5">
        <PageTitle className="text-black text-xl">Popular Categories</PageTitle>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoriesCard key={category._id} categories={category} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default HomeCategories;
