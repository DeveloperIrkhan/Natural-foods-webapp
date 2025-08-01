import { IProduct } from "@/interfaces/product.interface";
import { Edit, EyeIcon, Trash2 } from "lucide-react";
import React from "react";

interface IProductBarCard {
  item: IProduct;
}
const ProductBarCard = ({ item }: IProductBarCard) => {
  return (
    <div className="my-2">
      <div
        className="px-2 md:px-4 py-2 md:py-4 bg-white rounded-xl hover:shadow-lg duration-200
   gap-3 w-full shadow-md flex flex-row justify-between items-center"
      >
        <div className="flex">
          <img
            className="h-18 w-auto rounded"
            src={item.images[0]}
            alt="product image"
          />
          {/* <img src="banner.png" className="h-25 w-20" alt="" /> */}
        </div>
        <div className="flex flex-col justify-around items-center">
          <h2 className="text-[12px] md:text-[14px] md:font-semibold">
            {item.name}
          </h2>
          {/* <h2 className="text-[12px] md:text-[14px] font-normal md:font-semibold">
          Size : {cartItems.productSize}
        </h2> */}
        </div>
        <div className="flex flex-col justify-around items-center">
          <h2 className="text-[12px] md:text-[14px] md:font-semibold flex gap-2 items-center">
            Price :
            {item.discountPrice > 0 ? (
              <p className="">
                <span className="line-through"> {item.price}</span>
                <span className="text-red-600 font-bold">
                  {" "}
                  {item.discountPrice}
                </span>
              </p>
            ) : (
              <span className="font-bold"> {item.price}</span>
            )}
          </h2>
        </div>
        <div className="flex md:flex-row flex-col gap-3">
          <div className="flex flex-col justify-around items-center">
            <h2 className="text-[12px] md:text-[14px] font-normal md:font-semibold">
              <div className="flex gap-2">
                <Edit className="hoverEffect w-4 md:h-5 h-4 md:w-5 hover:text-blue-600 hover:cursor-pointer" />
                <Trash2 className="hoverEffect w-4 md:h-5 h-4 md:w-5 hover:text-red-600 hover:cursor-pointer" />
              </div>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBarCard;
