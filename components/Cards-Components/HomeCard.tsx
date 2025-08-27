"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import AddtoWishList from "../AddtoWishList";
import { StarIcon } from "lucide-react";
import { FaCartPlus, FaCartShopping } from "react-icons/fa6";
import PricePreview from "../PricePreview";
import { useFavoriteItemsStore } from "@/features/favoriteitems/favoriteitemsStore";
import { useCartStore } from "@/features/cart/cartStore";
import CustomButton from "../custom-ui/CustomButton";

interface IhomeCard {
  className?: string;
  _id: string;
  slug: string;
  image: string[];
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  discountPrice?: number;
  inStock: number;
  currencySymbol?: string;
  productStatus: string;
  buttonText?: string;
  onBuyNowClick?: () => void;
}

const HomeCard = ({
  className,
  _id,
  slug,
  image,
  title,
  inStock,
  subtitle, // Destructure subtitle
  price,
  discountPrice,
  description,
  productStatus,
  buttonText = "Buy Now",
  onBuyNowClick
}: IhomeCard) => {
  const { addToFavorite, favItems } = useFavoriteItemsStore();
  const {
    addToCart,
    items,
    removeFromCart,
  } = useCartStore();
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row group bg-white rounded-lg shadow-xl",
        "overflow-hidden",
        "w-full max-w-sm md:max-w-2xl",
        "h-auto md:h-[300px]",
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={_id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full  h-48 md:w-1/2 md:h-auto bg-white flex items-center justify-center relative"
        >
          {productStatus && (
            <div
              className="bg-primary-color border border-primary-color text-white px-2 
            py-0.5 rounded-md text-sm absolute z-10 top-2 left-3 hoverEffect group-hover:text-primary-color group-hover:bg-white group-hover:border-primary-color"
            >
              {productStatus}
            </div>
          )}
          <div className="">
            {favItems.some((item) => item.productId === _id) ? (
              <>
                <AddtoWishList
                  buttonClick={() => addToFavorite(_id)}
                  className="text-primary-color"
                />
              </>
            ) : (
              <>
                <AddtoWishList
                  buttonClick={() => addToFavorite(_id)}
                  className="text-gray-300"
                />
              </>
            )}
          </div>
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={image[0] || "/placeholder-image.jpg"} // Use actual image or a placeholder
              alt={title}
              className={`md:rounded-l-lg w-full h-full object-contain md:object-cover transition-transform duration-500 
                ease-in-out transform
                  group-hover:rotate-3 group-hover:scale-110 ${
                    inStock > 0 ? "" : "opacity-30"
                  }`}
            />
            <Link href={`/product-details/${slug}`}>
              <p
                className="tracking-widest absolute z-50 top-1/2 left-1/2 border-b-2 pb-1 border-black
       -translate-x-1/2 -translate-y-1/2 text-black text-lg font-semibold transition-all hidden duration-500 group-hover:block"
              >
                View Details
              </p>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-2 md:p-4 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-md md:text-xl font-bold text-gray-800 mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                {subtitle}
              </p>
            )}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 line-clamp-3">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  fill={index > 3 ? "bg-gray-200" : "#b4c635"}
                  className={`${
                    index > 4 ? "text-secondary-color" : "text-primary-color"
                  }`}
                  size={12}
                />
              ))}
            </div>
            <div className="flex text-gray-600 text-xs tracking-wider">
              5 Reviews
            </div>
          </div>
          <div
            className={`flex text-xs tracking-wider ${
              inStock > 0 ? "text-gray-600" : "text-red-600"
            }`}
          >
            {inStock > 0 ? <span>In Stock : {inStock}</span> : "out of stock"}
          </div>

          <div className="flex justify-between items-center mt-4 md:mt-0 gap-2">
            <div className="flex gap-2 text-xs justify-start items-center flex-nowrap">
              {/* <p className="text-sm text-gray-700 ">{currencySymbol}</p> */}
              <PricePreview
                price={price}
                discountPrice={discountPrice as number}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            {items.some((existingItem) => existingItem.productId === _id) ? (
              <>
                <CustomButton
                  disabled={inStock > 0 ? false : true}
                  onClickFuntion={
                    inStock > 0 ? () => removeFromCart(_id) : () => {}
                  }
                  buttonText="remove from cart"
                  buttonColor="bg-red-600"
                  icon={<FaCartShopping />}
                />
              </>
            ) : (
              <>
                <CustomButton
                  disabled={inStock > 0 ? false : true}
                  onClickFuntion={() => addToCart(_id)}
                  buttonText={inStock > 0 ? "Add to cart" : "Out of stock"}
                  buttonColor={inStock > 0 ? "" : "opacity-30"}
                  icon={<FaCartPlus />}
                />

                {/* <button
                  onClick={
                    inStock > 0
                      ? () => {
                          addToCart(_id);
                        }
                      : () => {}
                  }
                  disabled={inStock > 0 ? false : true}
                  className={` text-white font-semibold py-1 px-3 rounded-lg shadow-md
                        transition-colors duration-200 focus:outline-none focus:ring-2
                         focus:ring-opacity-50 ${
                           inStock > 0
                             ? "bg-primary-color hover:bg-secondary-color focus:ring-primary-color"
                             : "bg-gray-400 cursor-not-allowed"
                         }`}
                >
                  <div className="flex gap-2.5">
                    <ShoppingCart />{" "}
                    <p></p>
                  </div>
                </button> */}
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HomeCard;
