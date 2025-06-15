"use client";
import { useCartStore } from "@/features/cart/cartStore";
import { useGetProductQuery } from "@/features/product/productAPI";
import { useProductsStore } from "@/features/product/productStore";
import React, { useEffect } from "react";
import LoadingScreen from "./Loading/LoadingScreen";

const ClientHydration = () => {
  const hydrateCart = useCartStore((state) => state.hydrateCartFromStorage);
  const { data, isLoading } = useGetProductQuery();
  const { products, setProducts } = useProductsStore();

  useEffect(() => {
    hydrateCart();
    console.log("ClientHydration");
  }, []);

  useEffect(() => {
    if (data && data.products) {
      setProducts(data?.products);
    }
    console.log("Products from store calling in ClientHydration", products);
  }, [data, isLoading, products]);

  return <>{isLoading ? <LoadingScreen /> : null}</>;
};

export default ClientHydration;
