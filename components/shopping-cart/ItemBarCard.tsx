import { useCartStore } from "@/features/cart/cartStore";
import { IProduct } from "@/interfaces/product.interface";
import { Trash2 } from "lucide-react";
import React from "react";
import IncrementAndDecrementQuantity from "../IncrementAndDecrementQuantity";
import Link from "next/link";
import Image from "next/image";
import FavoriteHeartIcon from "./FavoriteHeartIcon";

interface IItemsBarCardProps {
  item: IProduct;
  cartItems: IShopingCartModel;
}
interface IShopingCartModel {
  productId: string;
  // productSize: string;
  Quantity: number;
}
const ItemBarCard = ({ item, cartItems }: IItemsBarCardProps) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } =
    useCartStore();

  return (
    <>
      <div className="w-full  bg-white p-2 md:p-4 rounded-lg shadow-sm flex justify-between gap-4">
        <div className="flex items-start h-full">
          <Link
            href={`/product-details/${item.slug}`}
            className="border flex flex-1 w-32 md:w-40 h-32 md:h-40 object-cover p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
          >
            <Image
              src={item.images[0]}
              alt="product Image"
              width={500}
              height={500}
              loading="lazy"
              className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
            />
          </Link>
        </div>
        <div className="flex w-full flex-col md:flex-row">
          <div className="w-full flex flex-col h-full">
            <div className="flex items-center gap-4">
              {/* Middle: Text Info */}
              <div className="flex flex-col justify-between gap-3 h-full">
                <h2 className="text-[15px] font-semibold">{item.name}</h2>
                <div className="text-[13px] font-semibold text-gray-600 flex gap-1.5">
                  <span> product Status:</span>
                  <span className="font-normal">{item.productStatus}</span>
                </div>
                <p className="text-[13px] font-semibold text-gray-600 md:block hidden">
                  product description:
                  <span className="font-normal">{item.description}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="w-auto h-full">
            <div className="flex flex-col justify-between gap-1 h-full">
              <div className="text-[12px] md:text-[14px] md:font-semibold flex gap-2 items-center">
                Price :
                {item.discountPrice > 0 ? (
                  <div className="flex gap-2">
                    <span className="line-through"> {item.price}</span>
                    <span className="text-red-600 font-bold">
                      {item.discountPrice}
                    </span>
                    <span className="text-sm text-gray-500">
                      x {cartItems.Quantity}
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <span className="font-bold"> {item.price}</span>
                    <div className="text-sm text-gray-500">
                      x {cartItems.Quantity}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Buttons */}
              <div className="flex justify-evenly items-center border gap-4">
                <IncrementAndDecrementQuantity
                  id={item._id}
                  incrementCartQuantity={incrementQuantity}
                  Quantity={cartItems.Quantity}
                  decrementCartQuantity={decrementQuantity}
                />
                <div className="flex items-center gap-3">
                  <FavoriteHeartIcon id={item._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemBarCard;
