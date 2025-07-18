"use client";
import ProductBarCard from "@/components/Admin/ProductBarCard";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import PageTitle from "@/components/PageTitle";
import { useGetProductQuery } from "@/features/product/productAPI";
import { IProduct } from "@/interfaces/product.interface";
import React, { useEffect, useState } from "react";

const page = () => {
  const { data, isLoading } = useGetProductQuery();
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    try {
      if (data?.products) {
        setProducts(data.products);
        console.log("products", data.products);
      }
    } catch (error) {}
  }, [data]);
  return (
    <div className="w-full">
      <PageTitle>Products Found : {products.length}</PageTitle>
      {isLoading && <LoadingScreen />}
      {products.length > 0 &&
        products.map((product) => (
          <div className="flex flex-col gap-3" key={product._id}>
            <ProductBarCard item={product} />
          </div>
        ))}
    </div>
  );
};

export default page;
