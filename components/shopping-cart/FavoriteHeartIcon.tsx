import { useFavoriteItemsStore } from "@/features/favoriteitems/favoriteitemsStore";
import React from "react";
import { FaHeart } from "react-icons/fa";

interface props {
  id: string;
}
const FavoriteHeartIcon = ({ id }: props) => {
  const { favItems, addToFavorite } = useFavoriteItemsStore();
  return (
    <div>
      {favItems.some((item) => item.productId === id) ? (
        <div className="h-7 w-7 rounded-full bg-primary-color flex items-center justify-center">
          <FaHeart
            onClick={() => addToFavorite(id)}
            className="text-white"
            size={15}
          />
        </div>
      ) : (
        <div className="h-7 w-7 rounded-full flex bg-gray-200 items-center justify-center">
          <FaHeart
            onClick={() => addToFavorite(id)}
            className="text-gray-400"
            size={15}
          />
        </div>
      )}
    </div>
  );
};

export default FavoriteHeartIcon;
