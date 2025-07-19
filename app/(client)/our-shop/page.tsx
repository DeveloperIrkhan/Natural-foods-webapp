"use client";
import SamillerCard from "@/components/Cards-Components/SamillerCard";
import Container from "@/components/Container";
import NoItemFounnd from "@/components/NoItemFounnd";
import FilterByPrice from "@/components/our-shop/FilterByPrice";
import FilteredProductForOurShop from "@/components/our-shop/FilteredProductForOurShop";
import FiteredProductContainer from "@/components/our-shop/FiteredProductContainer";
import PageTitle, { Textsm } from "@/components/PageTitle";
import { useCategoryStore } from "@/features/category/categoryStore";
import { useProductsStore } from "@/features/product/productStore";
import React, { useEffect, useState } from "react";
import { PriceArray } from "@/app/constants/constants";
const page = () => {
  const { categories } = useCategoryStore();

  const { products } = useProductsStore();
  const [filteredCategory, setFilteredCategory] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
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
  useEffect(() => {
    console.log(selectedPrice);
  }, [selectedPrice]);
  const filterProducts = products.filter((product) => {
    const matchCategory =
      filteredCategory.length === 0 ||
      filteredCategory.includes(product.category);

    const matchPrice =
      selectedPrice.length === 0 ||
      selectedPrice.some((selected) => {
        const priceRange = PriceArray.find((p) => p.value === selected)?.range;
        if (!priceRange) return false;
        return product.price >= priceRange[0] && product.price <= priceRange[1];
      });

    return matchCategory && matchPrice;
  });
  const handleChange = (value: string) => {
    setSelectedPrice((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };
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
                          className="appearance-none w-5 h-5 border-2 border-[#b4c635] rounded-full
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
                </div>

                <div className="price mt-5">
                  <p className="text-[15px] tracking-wide font-bold text-black">
                    {" "}
                    Filter by Price
                  </p>
                  {/* <FilterByPrice /> */}
                  <div className="flex flex-col gap-1.5">
                    {PriceArray.map((priceTag, index) => (
                      <label
                        key={index}
                        htmlFor={priceTag.title}
                        className="flex items-center capitalize gap-3 tracking-wider"
                      >
                        <input
                          id={priceTag.value}
                          name={priceTag.value}
                          type="checkbox"
                          className="appearance-none w-5 h-5 border-2 border-[#b4c635] rounded-sm
                            checked:bg-[#b4c635] checked:border-[#b4c635]
                            checked:after:content-['🗸'] checked:after:block
                            checked:after:text-black checked:after:text-sm checked:after:leading-none
                            checked:after:text-center
                            flex items-center justify-center cursor-pointer"
                          value={priceTag.value}
                          onChange={() => {
                            handleChange(priceTag.value);
                          }}
                          checked={selectedPrice.includes(priceTag.value)}
                        />
                        {priceTag.title}
                      </label>
                    ))}
                    {selectedPrice.length > 0 && (
                      <button
                        onClick={() => setSelectedPrice([])}
                        className="capitalize hover:cursor-pointer flex gap-2 my-4 font-bold text-primary-color"
                      >
                        Clear Price Filter
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:w-3/4 w-full p-3">
                <div className="flex items-center justify-between">
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
                  {filteredCategory.length > 0 && (
                    <button
                      onClick={() => setFilteredCategory([])}
                      className="capitalize hover:cursor-pointer flex gap-2 my-4 font-bold text-primary-color"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap md:justify-start justify-center items-center gap-1 md:gap-3">
                  {filterProducts && filterProducts.length > 0 ? (
                    filterProducts.map((product) => (
                      <FilteredProductForOurShop
                        key={product._id}
                        product={product}
                      />
                    ))
                  ) : (
                    <NoItemFounnd />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default page;
