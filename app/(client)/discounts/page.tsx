"use client";
import SamillerCard from "@/components/Cards-Components/SamillerCard";
import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";
import { useProductsStore } from "@/features/product/productStore";
import { IProduct } from "@/interfaces/product.interface";
import React, { useEffect, useMemo, useState } from "react";

const page = () => {
  const [hotDeals, setHotDeals] = useState<IProduct[]>([]);
  const { products } = useProductsStore();
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];
    return products.filter((product) => product.discountPrice > 0);
  }, [products]);

  useEffect(() => {
    // console.log(filteredProducts);
  }, [products]);

  return (
    <div className="bg-gray-50">
      <Container className="mx-5">
        <PageTitle className="text-primary-color tracking-wider">
          Our Offers
        </PageTitle>
        <div>
          <div className="w-full">
            <div className="flex md:flex-row flex-col gap-3">
              {filteredProducts?.map((item) => {
                return (
                  <SamillerCard
                    key={item._id}
                    product={item}
                    LinkTo={`/${item.slug}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
