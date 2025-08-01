import React, { useState } from "react";
import AdditionalInformation from "./AdditionalInformation";
import PageTitle from "../PageTitle";
import { useProductsStore } from "@/features/product/productStore";
import { useCartStore } from "@/features/cart/cartStore";
import PricePreview from "../PricePreview";
import PriceFormater from "../PriceFormater";
import { Heart, StarIcon } from "lucide-react";
import SocialMediaIcons from "../SocialMediaIcons";
import { useFavoriteItemsStore } from "@/features/favoriteitems/favoriteitemsStore";
import { IProduct } from "@/interfaces/product.interface";
import IncrementAndDecrementQuantity from "../IncrementAndDecrementQuantity";
import BenifetsDetails from "./BenifetsDetails";
interface props {
  product: IProduct;
}
const AditionalInfo = ({ product }: props) => {
  const { products } = useProductsStore();
  const { addToCart, items, removeFromCart } = useCartStore();
  const [activeTab, setActiveTab] = useState("Description");
  const { addToFavorite, favItems } = useFavoriteItemsStore();
  const tabs = ["Description", "Additional Information", "benefits"];
  return (
    <div className="w-full md:w-1/2 px-10 py-3">
      {product && (
        <>
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
            {items.some((cartItem) => cartItem.productId === product._id) ? (
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
                  disabled={product.inStock > 0 ? false : true}
                  className={`${
                    product.inStock > 0
                      ? "bg-primary-color hover:bg-secondary-color"
                      : "bg-gray-400 cursor-not-allowed"
                  } w-full  text-white px-6 py-2 rounded-lg shadow-md hoverEffect`}
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
              <p
                className={`text-sm mt-4 py-1 px-2 inline-block rounded-lg font-medium ${
                  product.inStock > 0
                    ? "text-secondary-color bg-primary-color/10"
                    : "bg-red-100"
                }`}
              >
                Product is{" "}
                {product.inStock > 0
                  ? "in stock"
                  : "out of stock at the moment"}
              </p>
            </div>
            <hr />
            <div className="text-gray-600 flex items-center gap-2">
              <p>Rating: </p>
              <span className="flex gap-1 items-center">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    size={15}
                    className="text-primary-color"
                    fill="#8fc22b"
                  />
                ))}
                <p className="font-semibold">{`(120)`}</p>
              </span>
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
                  <AdditionalInformation />
                </div>
              )}

              {activeTab === "benefits" && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    benefits details
                  </h2>
                  <BenifetsDetails
                    productName={product.name}
                    description={product.description}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AditionalInfo;
