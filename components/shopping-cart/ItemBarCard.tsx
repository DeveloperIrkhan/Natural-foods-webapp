import { useCartStore } from "@/features/cart/cartStore";
import { IProduct } from "@/interfaces/product.interface";
import { Trash2 } from "lucide-react";
import React from "react";
import IncrementAndDecrementQuantity from "../IncrementAndDecrementQuantity";

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
      <div className="w-full bg-white p-4 rounded-lg shadow-sm flex items-center justify-between gap-4">
        {/* Left: Image */}
        <div className="flex items-center gap-4">
          <img
            src={item.images[0]}
            alt="product"
            className="w-[120px] h-[120px] border object-contain rounded"
          />

          {/* Middle: Text Info */}
          <div className="flex flex-col">
            <h2 className="text-[15px] font-semibold">{item.name}</h2>
            <p className="text-[13px] text-gray-600">
              product Status: {item.productStatus}
            </p>
          </div>
        </div>

        {/* Right: Price + Quantity */}
        <div className="flex flex-col items-end justify-between gap-1">
          <div className="text-[12px] md:text-[14px] md:font-semibold flex gap-2 items-center">
            Price :
            {item.discountPrice > 0 ? (
              <p className="">
                <span className="line-through"> {item.price}</span>
                <span className="text-red-600 font-bold">
                  {item.discountPrice}
                </span>
              </p>
            ) : (
              <span className="font-bold"> {item.price}</span>
            )}{" "}
          </div>
          <div className="text-sm text-gray-500">x {cartItems.Quantity}</div>

          {/* Quantity Buttons */}
          <div className="flex gap-4">
            <IncrementAndDecrementQuantity
            id={item._id}
            incrementCartQuantity={incrementQuantity}
            Quantity={cartItems.Quantity}
            decrementCartQuantity={decrementQuantity}
          />
          <div className="flex items-center gap-3 mt-1">
            <Trash2
              onClick={() => removeFromCart(item._id)}
              className="w-4 h-4 text-gray-500 hover:text-red-600 hoverEffect cursor-pointer"
            />
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemBarCard;
