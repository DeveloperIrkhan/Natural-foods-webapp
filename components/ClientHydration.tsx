"use client";
import { useCartStore } from "@/features/cart/cartStore";
import { useGetProductQuery } from "@/features/product/productAPI";
import { useProductsStore } from "@/features/product/productStore";
import React, { useEffect } from "react";
import LoadingScreen from "./Loading/LoadingScreen";
import { useCategoryStore } from "@/features/category/categoryStore";
import { useGetCategoryQuery } from "@/features/category/categoryAPI";
import { useGetBlogsQuery } from "@/features/blogs/BlogAPI";
import { useBlogsStore } from "@/features/blogs/blogStore";

const ClientHydration = () => {
  const hydrateCart = useCartStore((state) => state.hydrateCartFromStorage);

  //fetching data from store.
  const { products, setProducts } = useProductsStore();
  const { blogs, setBlogs } = useBlogsStore();
  const { categories, setCategories } = useCategoryStore();

  //fetching from db
  const { data, isLoading: ProductLoading } = useGetProductQuery(undefined, {
    skip: products.length > 0
  });
  const { data: blogResponse, isLoading: BlogsLoading } = useGetBlogsQuery(
    undefined,
    { skip: blogs.length > 0 }
  );

  const { data: Categories, isLoading } = useGetCategoryQuery(undefined, {
    skip: categories.length > 0
  });

  useEffect(() => {
    hydrateCart();
  }, []);
  useEffect(() => {
    if (blogResponse?.blogs) {
      setBlogs(blogResponse.blogs);
    }
  }, [blogResponse]);

  useEffect(() => {
    if (
      data?.products &&
      JSON.stringify(products) !== JSON.stringify(data.products)
    ) {
      setProducts(data?.products);
    }
  }, [data]);

  useEffect(() => {
    if (Categories && Categories.categories) {
      setCategories(Categories.categories);
    }
  }, [Categories]);

  return (
    <>
      {/* {isLoading && <LoadingScreen />}
      {BlogsLoading && <LoadingScreen />}
      {ProductLoading && (
        <LoadingScreen text="Please wait, we are contacting the database!" />
      )} */}
      {(isLoading || BlogsLoading || ProductLoading) && (
        <LoadingScreen
          text={
            ProductLoading
              ? "Please wait, we are contacting the database!"
              : undefined
          }
        />
      )}
    </>
  );
};

export default ClientHydration;
