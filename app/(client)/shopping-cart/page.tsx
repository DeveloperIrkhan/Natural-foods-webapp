"use client";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Banner from "@/components/Banner/Banner";
import Container from "@/components/Container";
import ItemBarCard from "@/components/shopping-cart/ItemBarCard";
import TotalCheckOutCard from "@/components/shopping-cart/TotalCheckOutCard";
import { useCartStore } from "@/features/cart/cartStore";
import { useProductsStore } from "@/features/product/productStore";
import { SignInButton, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import Link from "next/link";
import { ShoppingBagIcon, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/public/ImagesUrls";

const page = () => {
  const { items, isHydrated } = useCartStore();
  const { products } = useProductsStore();
  useEffect(() => {}, [items, isHydrated]);
  useEffect(() => {}, [products]);
  const { isSignedIn } = useUser();
  return (
    <div className="bg-gradient-to-tr from-gray-100 to-gray-200 pb-52 md:pb-10">
      <Banner text="Shopping Cart" media="/Slider-2.png" />
      <Container className="flex md:flex-row flex-col lg:gap-8 md:gap-6 gap-3 py-10">
        <div className="w-full md:w-3/4 flex flex-col space-y-3">
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
            <div className="flex justify-center items-center w-full">
              <div className="flex bg-white space-y-2 shadow-md p-4 backdrop-blur-sm w-full rounded-md max-w-lg flex-col items-center justify-center text-center px-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                  }}
                  className="relative w-48 h-48 mx-auto"
                >
                  <Image
                    src={images.EmptyShoppingCart}
                    alt="shopping-cart"
                    layout="fill"
                    objectFit="contain"
                    className="drop-shadow-lg"
                  />
                </motion.div>
                <h2 className="text-xl font-semibold">
                  Your Cart is feeling lonely
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  it look like you haven't added anything to your cart yet,
                  let's change that and find some amazing product for you!
                </p>
                <Link
                  href="/our-shop"
                  className="block rounded-full custom-button hoverEffect 
                  border font-semibold border-gray-600 bg-gray-100 hover:bg-primary-color 
                  hover:shadow-[0_5px_10px_rgba(0_0_0/0.3)] text-gray-600 hover:border-primary-color hover:text-white px-4 py-2 duration-300"
                >
                  continue shopping
                </Link>
              </div>
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
