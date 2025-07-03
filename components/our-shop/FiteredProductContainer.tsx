"use client";
import React, { useEffect, useState } from "react";
import SamillerCard from "../Cards-Components/SamillerCard";
import NoItemFounnd from "../NoItemFounnd";
import { ICategory, IProduct } from "@/interfaces/product.interface";
import { useCategoryStore } from "@/features/category/categoryStore";
import Container from "../Container";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useProductsStore } from "@/features/product/productStore";

interface IFiteredProductContainer {
  slug: string;
}

const FiteredProductContainer = ({ slug }: IFiteredProductContainer) => {
  const { categories } = useCategoryStore();
  const { products } = useProductsStore();

  const [currentSlug, setCurrentSlug] = useState<string>(slug);
  const [gettingProducts, setGettingProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };
  useEffect(() => {
    if (!categories?.length || !products?.length) return;

    const matchedCategory = categories.find((cat) => cat.slug === currentSlug);
    if (!matchedCategory) {
      setGettingProducts([]);
      return;
    }

    const filteredProducts = products.filter(
      (product) => product.category === matchedCategory._id
    );

    setGettingProducts(filteredProducts);
  }, [
    currentSlug,
    categories?.map((c) => c._id).join(","), // stable string
    products?.map((p) => p._id).join(",") // stable string
  ]);

  return (
    <div>
      <div className="w-full">
        <Container>
          <div className="flex md:flex-row flex-col gap-3">
            <div className="md:w-1/4 w-full p-3 rounded-xl bg-white">
              <div className="filter">
                <p className="text-[15px] my-3 tracking-wide font-bold text-black">
                  Filter by category
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {categories &&
                  categories.map((item) => {
                    return (
                      <Button
                        onClick={() =>
                          handleCategoryChange(item?.slug as string)
                        }
                        className={`border border-primary-color bg-white text-black hoverEffect hover:bg-primary-color hover:text-white
                          ${
                            item.slug === currentSlug &&
                            "text-white bg-primary-color"
                          }`}
                        key={item._id}
                      >
                        {item.name}
                      </Button>
                    );
                  })}
              </div>
            </div>
            <div className="md:w-3/4 flex gap-3 p-3">
              {gettingProducts && gettingProducts.length > 0 ? (
                gettingProducts.map((item) => (
                  <SamillerCard
                    product={item}
                    LinkTo={`${item.slug}`}
                    key={item._id}
                  />
                ))
              ) : (
                <NoItemFounnd />
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default FiteredProductContainer;
