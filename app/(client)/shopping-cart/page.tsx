"use client";
import Banner from "@/components/Banner/Banner";
import Container from "@/components/Container";
import ItemBarCard from "@/components/shopping-cart/ItemBarCard";
import TotalCheckOutCard from "@/components/shopping-cart/TotalCheckOutCard";
import { useCartStore } from "@/features/cart/cartStore";
import { useProductsStore } from "@/features/product/productStore";
import { SignInButton, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

const page = () => {
  const { items, isHydrated } = useCartStore();
  const { products } = useProductsStore();
  useEffect(() => {
    // console.log("Hydrated:", isHydrated);
    // console.log("Items from store:", items);
  }, [items, isHydrated]);
  useEffect(() => {
    // console.log("products:", products);
  }, [products]);
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center h-[70vh] flex-col gap-4">
        <p className="text-lg text-gray-700">
          Please sign in to view your shopping cart
        </p>
        <SignInButton mode="modal">
          <button className="bg-primary-color px-4 py-2 rounded-md text-white text-sm hover:bg-white hover:text-primary-color hover:border hover:border-primary-color hover:shadow-[0_0_15px_rgba(131,184,53,0.5)] transition duration-300">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }
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
            <div className="flex w-full bg-red-200 rounded-md py-3 px-6 items-center text-lg">
              <h3>your shopping cart is empty!</h3>
            </div>
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
