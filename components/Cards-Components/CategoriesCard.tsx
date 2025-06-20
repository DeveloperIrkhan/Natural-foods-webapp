import { ICategory } from "@/interfaces/product.interface";
import React from "react";

interface ICategoriesCard {
  categories: ICategory;
}
const CategoriesCard = ({ categories }: ICategoriesCard) => {
  return (
    <div className="max-w-[200px] rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105 group bg-white">
      {/* Product Image */}
      <div className="relative flex justify-center items-center p-4">
        <img
          src="/banner.png" // Replace with your image path
          alt="Chocolate Cookie"
          className="w-28 h-28 object-cover rounded-full"
        />
        {/* NEW Badge */}
        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
          NEW
        </span>
      </div>

      {/* Product Details */}
      <div className="px-4 pb-4 text-center">
        <p className="font-bold text-[15px] text-gray-900">{categories.name}</p>

        {/* Stars */}
        <div className="flex justify-center items-center gap-1 text-primary-color text-sm my-1">
          {"★".repeat(5)}
          <span className="text-gray-500 text-xs ml-1">(4)</span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 mb-3">Total Items found (10)</p>

        {/* Button */}
        <button className="w-full border border-gray-300 py-1 rounded-full text-sm font-medium text-gray-700 transition-all duration-300 group-hover:bg-primary-color group-hover:text-white">
          Explore Now
        </button>

        {/* Availability Note */}
        <p className="mt-2 text-[10px] text-gray-400">
          Choose a store to see local availability
        </p>
      </div>
    </div>
  );
};

export default CategoriesCard;
