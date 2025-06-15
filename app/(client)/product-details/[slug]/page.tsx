"use client";

import Container from "@/components/Container";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useProductsStore } from "@/features/product/productStore";
import PageTitle from "@/components/PageTitle";
import PriceFormater from "@/components/PriceFormater";
import AddtoWishList from "@/components/AddtoWishList";
import { Facebook, Heart, Instagram, PhoneCall, X } from "lucide-react";
import SocialMediaIcons from "@/components/SocialMediaIcons";
import { useCartStore } from "@/features/cart/cartStore";

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { products, setProducts } = useProductsStore();
  const product = products.find((item) => item.slug === slug);
  const [displayImage, setDisplayImage] = useState(product?.images[0]);
  const [productSize, setProductSize] = useState("");
  const { addToCart, items } = useCartStore();
  // );

  useEffect(() => {
    console.log("slug:", slug);
    console.log("zustand stored products:", products);
    // console.log("Product:", product);
  }, [slug, products]);

  return (
    <Container className="my-3 px-4 sm:px-[5vw] md:px-[7cw] lg:px-[9vw]">
      {product ? (
        <div className="w-full flex gap-2 flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-3">
            <img
              className="w-full"
              src={displayImage}
              alt={product.name}
              width={300}
            />
            <div className="flex mt-2 md:flex-row w-1/4 gap-2 sm:gap-4 order-2 md:order-1">
              {product.images.map((item) => (
                <img
                  key={item}
                  onClick={() => setDisplayImage(item)}
                  src={item}
                  alt={product.name}
                  width={300}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10 py-3">
            <div>
              <PageTitle className="text-gray-800 uppercase tracking-[6px]">
                {product.name}
              </PageTitle>
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="">
                <PriceFormater
                  amount={product.price}
                  className="text-gray-700 text-xl font-medium tracking-wide"
                />
              </p>

              <button
                onClick={() => addToCart(product._id, productSize)}
                className="bg-primary-color text-white px-6 py-2 rounded hover:bg-secondary-color hoverEffect"
              >
                ADD TO CART
              </button>
              {/* description */}
              <div className="text-gray-600">
                {product.quantity && (
                  <div className="mt-4 flex items-center gap-2">
                    <p className="font-semibold">Quantity</p>
                    {product.quantity.map((item) => (
                      <button
                        onClick={() => setProductSize(item)}
                        key={item}
                        className={`px-2 py-1 border shadow-md border-gray-400 rounded-md text-sm duration-300 ${
                          item === productSize
                            ? "bg-black text-white"
                            : "bg-gray-400 text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-4">
                  <p className="font-semibold">Description</p>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Heart size={20} /> <p>Add to Wishlist</p>
                </div>
                <p className="text-sm mt-4">
                  Product is {product.inStock ? "in stock" : "out of stock"}
                </p>
              </div>
              <div className="flex items-center mt-6 gap-6">
                <SocialMediaIcons toolTipClassName="bg-black text-white" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found for slug: {slug}</p>
      )}
    </Container>
  );
};

export default Page;
