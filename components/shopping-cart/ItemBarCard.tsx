import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const ItemBarCard = () => {
  return (
    <div
      className="px-2 md:px-4 py-2 md:py-4 bg-white rounded-xl hover:shadow-lg duration-200
   gap-3 w-full shadow-md flex flex-row justify-between items-center"
    >
      <div className="flex">
        <img
          className="h-18 w-12 rounded"
          src={
            "http://res.cloudinary.com/dc1xfzfde/image/upload/v1748687093/moringa-powder-1748687091361.jpg"
          }
          alt="product image"
        />
        {/* <img src="banner.png" className="h-25 w-20" alt="" /> */}
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2 className="text-[12px] md:text-[14px] md:font-semibold">
          Musturd Oil
        </h2>
        <h2 className="text-[12px] md:text-[14px] font-normal md:font-semibold">
          Size : 500mg
        </h2>
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2 className="text-[12px] md:text-[14px] md:font-semibold">
          Price : Rs/- 5000
        </h2>
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2 className="text-[12px] md:text-[14px] md:font-semibold">
          Quantity
        </h2>
        <div className="flex gap-2 justify-center items-center">
          <Minus className="hoverEffect w-4 md:h-5 h-4 md:w-5 bg-primary-color rounded-full p-0.5 md:p-1 hover:text-white hover:cursor-pointer" />
          <span className="font-semibold md:font-bold text-md">1</span>
          {/* <span className="w-6 h-6 rounded-full bg-primary-color flex justify-center items-center font-bold">
            +
          </span> */}
          <Plus className="hoverEffect w-4 md:h-5 h-4 md:w-5 bg-primary-color rounded-full p-0.5 md:p-1 hover:text-white hover:cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col justify-around items-center">
        <h2 className="text-[12px] md:text-[14px] font-normal md:font-semibold">
          <Trash2 className="hoverEffect w-4 md:h-5 h-4 md:w-5 hover:text-red-600 hover:cursor-pointer" />
        </h2>
      </div>
    </div>
  );
};

export default ItemBarCard;
