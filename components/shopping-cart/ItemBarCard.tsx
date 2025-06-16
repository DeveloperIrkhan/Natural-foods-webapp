import { useCartStore } from "@/features/cart/cartStore";
import { IProduct } from "@/interfaces/product.interface";
import { Trash2 } from "lucide-react";
import React from "react";

interface IItemsBarCardProps {
  item: IProduct;
  cartItems: IShopingCartModel;
}
interface IShopingCartModel {
  productId: string;
  productSize: string;
  Quantity: number;
}
const ItemBarCard = ({ item, cartItems }: IItemsBarCardProps) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } =
    useCartStore();

  return (
    <div
      className="px-2 md:px-4 py-2 md:py-4 bg-white rounded-xl hover:shadow-lg duration-200
   gap-3 w-full shadow-md flex flex-row justify-between items-center"
    >
      <div className="flex">
        <img
          className="h-18 w-12 rounded"
          src={item.images[0]}
          alt="product image"
        />
        {/* <img src="banner.png" className="h-25 w-20" alt="" /> */}
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2 className="text-[12px] md:text-[14px] md:font-semibold">
          {item.name}
        </h2>
        <h2 className="text-[12px] md:text-[14px] font-normal md:font-semibold">
          Size : {cartItems.productSize}
        </h2>
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2 className="text-[12px] md:text-[14px] md:font-semibold">
          Price : {item.price} x {cartItems.Quantity}
        </h2>
      </div>
      <div className="flex flex-col justify-around items-center">
        <div className="flex items-center gap-4 mt-4">
          <div className="flex border rounded-full overflow-hidden w-full">
            <button
              onClick={() => decrementQuantity(item._id, cartItems.productSize)}
              className="flex flex-1 justify-center items-center px-3 py-1 hover:bg-secondary-color duration-200 font-bold hover:text-white"
            >
              -
            </button>
            <span className="font-semibold flex flex-1  justify-center items-center px-4 py-1">
              {cartItems.Quantity}
            </span>
            <button
              onClick={() => incrementQuantity(item._id, cartItems.productSize)}
              className="flex flex-1 justify-center items-center px-3 py-1 hover:bg-secondary-color duration-200 font-bold hover:text-white"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2 className="text-[12px] md:text-[14px] font-normal md:font-semibold">
          <Trash2
            onClick={() => removeFromCart(item._id, cartItems.productSize)}
            className="hoverEffect w-4 md:h-5 h-4 md:w-5 hover:text-red-600 hover:cursor-pointer"
          />
        </h2>
      </div>
    </div>
  );
};

export default ItemBarCard;
