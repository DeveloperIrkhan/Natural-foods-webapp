"use client";
import React from "react";
import Container from "../Container";
import PageTitle from "../PageTitle";
import CategoriesCard from "./CategoriesCard";
import { useCategoryStore } from "@/features/category/categoryStore";
import { useProductsStore } from "@/features/product/productStore";
import SectionHeading from "../SectionHeading";

const HomeCategories = () => {
  const { products } = useProductsStore();
  const { categories } = useCategoryStore();
  return (
    <div>
      <Container className="m-5">
        <hr/>
        {/* <PageTitle className="text-black text-xl">Popular Categories</PageTitle> */}
        <SectionHeading
        title="Our Categories"
        subtitle="All our categories"
      />
        <div className="flex my-5 gap-6 justify-center items-center flex-wrap">

          {/* <div className="grid grid-cols-2 md:grid-cols-6 gap-4"> */}
          {categories.map((category) => {
            const productCount = products.filter(
              (item) => item.category === category._id
            );
            return (
              <CategoriesCard
                className="flex-1 bg-black-color/10 text-white"
                key={category._id}
                categories={category}
                productCount={productCount.length}
              />
            );
          })}
        </div>
        {/* </div> */}
      </Container>
    </div>
  );
};

export default HomeCategories;
