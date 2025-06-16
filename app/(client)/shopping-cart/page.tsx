"use client";
import Banner from "@/components/Banner/Banner";
import Container from "@/components/Container";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import ItemBarCard from "@/components/shopping-cart/ItemBarCard";
import TotalCheckOutCard from "@/components/shopping-cart/TotalCheckOutCard";
import { useCartStore } from "@/features/cart/cartStore";
import { useProductsStore } from "@/features/product/productStore";
import React, { useEffect } from "react";

const page = () => {
  const { items, isHydrated } = useCartStore();
  const { products } = useProductsStore();
  useEffect(() => {
    console.log("Hydrated:", isHydrated);
    console.log("Items from store:", items);
  }, [items, isHydrated]);
  useEffect(() => {
    console.log("products:", products);
  }, [products]);

  return (
    <div className="bg-gray-100">
      <Banner text="Dashboard" media="/Slider-2.png" />
      <Container className="flex md:flex-row flex-col gap-3 py-10">
        <div className="w-full md:w-3/4 flex justify-center flex-col space-y-3">
          {isHydrated && items.length > 0 ? (
            items.map((items, index) => {
              const singleProduct = products.find(
                (product) => product._id === items.productId
              );
              return (
                <div key={index}>
                  {singleProduct && (
                    <ItemBarCard cartItems={items} item={singleProduct} />
                  )}
                </div>
              );
            })
          ) : (
            <LoadingScreen />
          )}
        </div>
        <div className="w-full md:w-1/4 flex justify-center">
          <TotalCheckOutCard />
        </div>
      </Container>
    </div>
  );
};

export default page;
