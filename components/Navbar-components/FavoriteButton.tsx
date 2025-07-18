"use client";
import { useFavoriteItemsStore } from "@/features/favoriteitems/favoriteitemsStore";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FavoriteButton = () => {
  const { favItems, getTotalFavItems } = useFavoriteItemsStore();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(getTotalFavItems());
    // console.log("total fav", total);
  }, [favItems]);
  return (
    <Link href="/favorite-list" className="group relative hoverEffect">
      <Heart className="hoverEffect w-5 h-5 hover:text-secondary-color hover:cursor-pointer" />
      <span
        className={`absolute -top-3 -right-3 hoverEffect text-white text-[12px] bg-primary-color group-hover:bg-secondary-color rounded-full w-5 h-5 flex justify-center items-center`}
      >
        {total}
      </span>
    </Link>
  );
};

export default FavoriteButton;
