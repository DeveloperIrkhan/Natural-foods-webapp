"use client";
import SamillerCard from "@/components/Cards-Components/SamillerCard";
import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";
import { useCategoryStore } from "@/features/category/categoryStore";
import { useProductsStore } from "@/features/product/productStore";
import React, { useState } from "react";

const page = () => {
  const { categories } = useCategoryStore();
  const { products } = useProductsStore();
  const [filteredCategory, setFilteredCategory] = useState<string[]>([]);
  const toggleCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    setFilteredCategory((prev) => {
      const update = prev.includes(target)
        ? prev.filter((item) => item != target)
        : [...prev, target];
      console.log("Selected Categories:", update);

      return update;
    });
  };

  const filterProducts =
    filteredCategory.length === 0
      ? products
      : products.filter((product) =>
          filteredCategory.includes(product.category)
        );
  return (
    <div className="bg-gray-50">
      <Container>
        <PageTitle>Our Shop</PageTitle>
        <Container>
          <div className="w-full">
            <div className="flex md:flex-row flex-col gap-3">
              <div className="md:w-1/4 w-full p-3 rounded-xl bg-white">
                <div className="filter">
                  <p className="text-[15px] tracking-wide font-bold text-black">
                    {" "}
                    Filter by category
                  </p>
                </div>
                {categories &&
                  categories.map((category) => (
                      <label key={category._id}
                        htmlFor={category.name}
                        className="flex items-center capitalize gap-3 tracking-wider"
                      >
                        <input
                          id={category.name}
                          name={category.name}
                          type="checkbox"
                          //  className="w-5 h-5 accent-[#b4c635] text-white cursor-pointer"
                          className="appearance-none w-5 h-5 border-2 border-[#b4c635] rounded-sm 
                            checked:bg-[#b4c635] checked:border-[#b4c635] 
                            checked:after:content-['🗸'] checked:after:block 
                            checked:after:text-black checked:after:text-sm checked:after:leading-none 
                            checked:after:text-center
                            flex items-center justify-center cursor-pointer"
                          value={category._id}
                          onChange={toggleCategories}
                          checked={filteredCategory.includes(category._id)}
                        />
                        {category.name}
                      </label>
                  
                  ))}
                <div className="price">Filter Price wise</div>
              </div>
              <div className="md:w-3/4 w-full p-3">
                {filterProducts && filterProducts.length > 0 ? (
                  // <div className="flex flex-wrap gap-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filterProducts.map((product) => (
                      <div key={product._id}>
                        <SamillerCard product={product} LinkTo={product.slug} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>product is loading</div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default page;
