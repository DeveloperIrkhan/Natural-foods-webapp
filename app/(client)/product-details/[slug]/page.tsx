"use client";
import Container from "@/components/Container";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useProductsStore } from "@/features/product/productStore";
import PageTitle from "@/components/PageTitle";
import PriceFormater from "@/components/PriceFormater";
import { Heart } from "lucide-react";
import SocialMediaIcons from "@/components/SocialMediaIcons";
import { useCartStore } from "@/features/cart/cartStore";
import { useFavoriteItemsStore } from "@/features/favoriteitems/favoriteitemsStore";
import NoItemFounnd from "@/components/NoItemFounnd";
import SamillerCard from "@/components/Cards-Components/SamillerCard";
import PricePreview from "@/components/PricePreview";

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { products } = useProductsStore();
  const product = products.find((item) => item.slug === slug);
  const [displayImage, setDisplayImage] = useState(product?.images[0]);
  const { addToCart, items, removeFromCart } = useCartStore();
  const [activeTab, setActiveTab] = useState("Description");
  const { addToFavorite, favItems } = useFavoriteItemsStore();
  useEffect(() => {
    console.log("slug:", slug);
    console.log("zustand stored products:", products);
    // console.log("Product:", product);
  }, [slug, products]);
  const tabs = ["Description", "Additional Information", "Reviews"];

  return (
    <Container className="my-3 px-4 sm:px-[5vw] md:px-[7cw] lg:px-[9vw]">
      {product ? (
        <>
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
                <PriceFormater
                  amount={product.price}
                  className="text-gray-700 text-xl font-medium tracking-wide"
                />
                <PricePreview
                  price={product.price}
                  discountPrice={product.discountPrice}
                />
                {items.some(
                  (cartItem) => cartItem.productId === product._id
                ) ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="w-full bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 hoverEffect"
                    >
                      Remove From Cart
                    </button>
                    <div
                      onClick={() => addToFavorite(product._id)}
                      className={`shadow hoverEffect hover:shadow-lg w-10 h-10 rounded-md flex justify-center items-center text-white
                        ${
                          favItems.some(
                            (item) => item.productId === product._id
                          )
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-primary-color hover:bg-secondary-color"
                        }`}
                    >
                      <Heart />
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCart(product._id)}
                      className="w-full bg-primary-color text-white px-6 py-2 rounded-lg shadow-md hover:bg-secondary-color hoverEffect"
                    >
                      ADD TO CART
                    </button>
                    <div
                      onClick={() => addToFavorite(product._id)}
                      className={`shadow hoverEffect hover:shadow-lg w-10 h-10 rounded-md flex justify-center items-center text-white
                        ${
                          favItems.some(
                            (item) => item.productId === product._id
                          )
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-primary-color hover:bg-secondary-color"
                        }`}
                    >
                      <Heart />
                    </div>
                  </div>
                )}

                <div className="text-gray-600">
                  {/* {product.quantity && (
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
                  )} */}

                  <p className="text-sm mt-4">
                    Product is {product.inStock ? "in stock" : "out of stock"}
                  </p>
                </div>
                <div className="flex items-center mt-6 gap-6">
                  <SocialMediaIcons toolTipClassName="bg-black text-white" />
                </div>
                <div className="flex justify-center mt-10">
                  <div className="flex bg-gray-200 rounded-full overflow-hidden shadow-md w-[600px]">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={` w-1/3 text-sm font-medium py-2 px-4 transition-all duration-200
              ${
                activeTab === tab
                  ? "bg-white border border-primary-color text-primary-color"
                  : "bg-gray-200 text-black"
              } rounded-full`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-3 w-full mx-auto p-4 rounded shadow-sm bg-white">
                  {activeTab === "Description" && (
                    <div className="mt-4">
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  )}

                  {activeTab === "Additional Information" && (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        Additional Information
                      </h2>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Material: 100% Cotton</li>
                        <li>Available Sizes: S, M, L, XL</li>
                        <li>Color Options: Black, White, Red</li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "Reviews" && (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        Customer Reviews
                      </h2>
                      <p>
                        No reviews yet. Be the first to review this product!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col mt-6 justify-between items-center">
              <PageTitle className="uppercase font-Jost font-light tracking-[7px] text-gray-900">
                you may also like...
              </PageTitle>
            </div>
            <div className="flex items-center gap-5">
              {products
                .filter((item) => item.category === product.category)
                .slice(0, 6)
                .map((samillerItem) => (
                  <div
                    key={samillerItem._id}
                    className="flex justify-center items-center gap-32"
                  >
                    <SamillerCard
                      product={samillerItem}
                      LinkTo={samillerItem.slug}
                    />
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <NoItemFounnd selectedTab={slug} />
      )}
    </Container>
  );
};

export default Page;
