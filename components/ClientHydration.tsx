"use client";
import { useCartStore } from "@/features/cart/cartStore";
import { useGetProductQuery } from "@/features/product/productAPI";
import { useProductsStore } from "@/features/product/productStore";
import React, { useEffect } from "react";
import LoadingScreen from "./Loading/LoadingScreen";
import { useCategoryStore } from "@/features/category/categoryStore";
import { useGetCategoryQuery } from "@/features/category/categoryAPI";

const ClientHydration = () => {
  const hydrateCart = useCartStore((state) => state.hydrateCartFromStorage);
  const { products, setProducts } = useProductsStore();
  const { categories, setCategories } = useCategoryStore();
  const { data, isLoading: ProductLoading } = useGetProductQuery(undefined, {
    skip: products.length > 0
  });
  const { data: Categories, isLoading } = useGetCategoryQuery(undefined, {
    skip: categories.length > 0
  });
  useEffect(() => {
    hydrateCart();
  }, []);

  useEffect(() => {
    if (
      data?.products &&
      JSON.stringify(products) !== JSON.stringify(data.products)
    ) {
      setProducts(data?.products);
    }
    // console.log(
    //   "Products from store calling in ClientHydration",
    //   data?.products
    // );
  }, [data]);

  useEffect(() => {
    if (Categories && Categories.categories) {
      setCategories(Categories.categories);
    }
    // console.log("categories from store calling in ClientHydration", categories);
  }, [Categories]);

  return (
    <>
      {ProductLoading ? (
        <LoadingScreen text="Please wait, we are contacting the database!" />
      ) : isLoading ? (
        <LoadingScreen />
      ) : null}
    </>
  );
};

export default ClientHydration;
