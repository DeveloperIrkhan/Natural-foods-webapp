"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import AddtoWishList from "../AddtoWishList";
import { ShoppingCart, StarIcon } from "lucide-react";
import PricePreview from "../PricePreview";
import { useFavoriteItemsStore } from "@/features/favoriteitems/favoriteitemsStore";
import IncrementAndDecrementQuantity from "../IncrementAndDecrementQuantity";

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
  inStock: boolean;
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
  discountPrice = 20,
  description,
  productStatus,
  buttonText = "Buy Now",
  onBuyNowClick
}: IhomeCard) => {
  const { addToFavorite } = useFavoriteItemsStore();
  const [showButtons, setShowButtons] = useState(false);
  return (
    <Link
      href={`/product-details/${slug}`}
      className={cn(
        "flex flex-col md:flex-row group bg-white rounded-lg shadow-xl",
        "overflow-hidden",
        "w-full max-w-sm md:max-w-2xl",
        "h-auto md:h-[300px]",
        className
      )}
    >
      <AnimatePresence>
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
            <AddtoWishList onClick={() => addToFavorite(_id)} />
          </div>
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={image[0] || "/placeholder-image.jpg"} // Use actual image or a placeholder
              alt={title}
              className="md:rounded-l-lg w-full h-full object-cover transition-transform duration-500 ease-in-out transform
       group-hover:rotate-3 group-hover:scale-110"
            />
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
              inStock ? "text-gray-600" : "text-red-600"
            }`}
          >
            {inStock ? "in stock" : "out of stock"}
          </div>

          <div className="flex justify-between items-center mt-4 md:mt-0 gap-2">
            <div className="flex gap-2 text-xs justify-start items-center flex-nowrap">
              {/* <p className="text-sm text-gray-700 ">{currencySymbol}</p> */}
              <PricePreview price={price} discountPrice={discountPrice} />
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between">
            {showButtons && (
              <IncrementAndDecrementQuantity
                id=""
                Quantity={0}
                cartProductSize=""
                decrementCartQuantity={() => console.log("")}
                incrementCartQuantity={() => console.log("")}
              />
            )}
            <button
              onClick={() => setShowButtons(!showButtons)}
              className="bg-primary-color text-white font-semibold mt-4 py-1 px-3 rounded-lg shadow-md
                       hover:bg-secondary-color transition-colors duration-200 focus:outline-none focus:ring-2
                        focus:ring-primary-color focus:ring-opacity-50"
            >
              <ShoppingCart />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Link>
  );
};

export default HomeCard;
