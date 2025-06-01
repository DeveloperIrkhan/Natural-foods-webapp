import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface IhomeCard {
  className?: string;
  id: string;
  image: string[];
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  currencySymbol?: string;
  buttonText?: string;
  onBuyNowClick?: () => void;
}

const HomeCard = ({
  className,
  id,
  image,
  title,
  subtitle, // Destructure subtitle
  price,
  description,
  currencySymbol = "Rs/-",
  buttonText = "Buy Now",
  onBuyNowClick
}: IhomeCard) => {
  return (
    <Link
      href={`/product-details/${id}`}
      className={cn(
        "flex flex-col md:flex-row group bg-white rounded-lg shadow-xl",
        "overflow-hidden",
        "w-full max-w-sm md:max-w-2xl",
        "h-auto md:h-[300px]",
        className
      )}
    >
      <div className="w-full  h-48 md:w-1/2 md:h-auto bg-white flex items-center justify-center relative">
        <div className="bg-primary-color text-white px-2 py-1 rounded-md uppercase text-sm font-semibold absolute z-10 top-2 left-3">
          save %
        </div>

        <div className="relative w-full h-full overflow-hidden">
          <img
            src={image[0] || "/placeholder-image.jpg"} // Use actual image or a placeholder
            alt={title}
            className="md:rounded-l-lg w-full h-full object-cover transition-transform duration-500 ease-in-out transform
       group-hover:rotate-3 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-2 md:p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-md md:text-xl font-bold text-gray-800 mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
              {subtitle}
            </p>
          )}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 line-clamp-5">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4 md:mt-0 gap-2">
          <span className="text-sm font-bold text-gray-800">
            {currencySymbol}
            {price.toFixed(2)}
          </span>
          <button
            onClick={onBuyNowClick}
            className="bg-primary-color text-white font-semibold py-3 px-6 rounded-lg shadow-md
                       hover:bg-secondary-color transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-opacity-50"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
