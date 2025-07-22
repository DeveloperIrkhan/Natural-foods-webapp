"use client";
import { cn } from "@/lib/utils";
import { FaHeart } from "react-icons/fa";
import React from "react";
interface IAddToWishList {
  className?: string;
  buttonClick: () => void;
}
const AddtoWishList = ({ className, buttonClick }: IAddToWishList) => {
  return (
    <button onClick={() => buttonClick()}>
      <FaHeart
        className={cn(
          "absolute z-10 top-2 right-2 w-5 h-5 hoverEffect hover:text-gray-400 hover:cursor-pointer",
          className
        )}
      />
    </button>
  );
};

export default AddtoWishList;
