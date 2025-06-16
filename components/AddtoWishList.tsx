"use client";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import React from "react";
interface IAddToWishList {
  className?: string;
  onClick: () => void;
}
const AddtoWishList = ({ className }: IAddToWishList) => {
  return (
    <button className={cn("absolute z-10 top-2 right-2", className)}>
      <Heart className="hoverEffect w-4 h-4 hover:text-secondary-color hover:cursor-pointer" />
    </button>
  );
};

export default AddtoWishList;
