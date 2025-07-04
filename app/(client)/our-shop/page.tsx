"use client";
import SamillerCard from "@/components/Cards-Components/SamillerCard";
import Container from "@/components/Container";
import NoItemFounnd from "@/components/NoItemFounnd";
import FiteredProductContainer from "@/components/our-shop/FiteredProductContainer";
import PageTitle, { Textsm } from "@/components/PageTitle";
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
      // console.log("Selected Categories:", update);
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
                  <p className="text-[15px] my-3 tracking-wide font-bold text-black">
                    {" "}
                    Filter by category
                  </p>
                </div>
                {categories &&
                  categories.map((category) => (
                    <label
                      key={category._id}
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
                    // <div
                    //   className="w-3/4 border text-gray-700 rounded-lg my-2 gap-3 px-3 p-1 hover:bg-primary-color hoverEffect text-center cursor-pointer hover:text-white"
                    //   key={category._id}
                    // >
                    //   {category.name}
                    // </div>
                  ))}
                <div className="price mt-5">
                  <p className="text-[15px] tracking-wide font-bold text-black">
                    {" "}
                    Filter by Price
                  </p>
                </div>
              </div>
              <div className="md:w-3/4 w-full p-3">
                <Textsm className="capitalize flex gap-2 my-4 font-bold text-primary-color">
                  result showing for
                  {filteredCategory.map((item, index) => {
                    const filterCategory = categories.filter(
                      (category) => category._id === item
                    );
                    return (
                      <span key={index} className="text-gray-800 font-normal">
                        {filterCategory &&
                          filterCategory.map((item) => item.name)}
                      </span>
                    );
                  })}
                </Textsm>
                {filterProducts && filterProducts.length > 0 ? (
                  <FiteredProductContainer products={filterProducts} slug="" />
                ) : (
                  <NoItemFounnd
                    className=""
                    selectedTab={""}
                  />
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
