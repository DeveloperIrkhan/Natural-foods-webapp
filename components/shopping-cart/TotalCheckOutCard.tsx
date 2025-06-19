import React, { useEffect, useState } from "react";
import PageTitle, { Textsm } from "../PageTitle";
import { useCartStore } from "@/features/cart/cartStore";
import PriceFormater from "../PriceFormater";

const TotalCheckOutCard = () => {
  const { getCartAmount, getDiscountTotal, settotalAmountAfter } =
    useCartStore();
  let subtotal = Number(getCartAmount());
  let discount = Number(getDiscountTotal());
  let shippingcharges = 500;
  let total = subtotal - discount + shippingcharges;
  useEffect(() => {
    console.log("subtotal amount", total);
    settotalAmountAfter(total);
  }, [subtotal]);
  useEffect(() => {
    console.log("discount from state", discount);
  }, [discount]);
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div
      className="px-2 md:px-4 py-2 md:py-4 bg-white rounded-xl
   gap-3 w-full shadow-md"
    >
      <Textsm className="text-gray-700 text-[20px] font-bold">
        Order Summary
      </Textsm>
      <hr className="my-5" />
      <div className="flex flex-col font- font-semibold text-[15px]">
        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <PriceFormater amount={subtotal} className="" />
        </div>
        <div className="flex items-center justify-between">
          <p>Discount</p>
          <PriceFormater amount={discount} className="text-red-500" />
        </div>
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <PriceFormater amount={shippingcharges} className="font-semibold" />
        </div>
      </div>
      <hr className="my-5" />
      <Textsm className="">
        <PriceFormater
          amount={total}
          className="text-gray-700 text-[20px] font-bold"
        />
      </Textsm>

      <label
        htmlFor="termsandconditions"
        className="flex items-center space-x-2 text-sm gap-3"
      >
        <input
          id="termsandconditions"
          name="termsandconditions"
          type="checkbox"
          className="appearance-none w-5 h-5 border-2 border-[#b4c635] rounded-sm 
                            checked:bg-[#b4c635] checked:border-[#b4c635] 
                            checked:after:content-['🗸'] checked:after:block 
                            checked:after:text-black checked:after:text-sm checked:after:leading-none 
                            checked:after:text-center
                             cursor-pointer"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          //   onChange={(e) => setInStock(e.target.checked)}
        />
        I agreed with the terms and conditions
      </label>
      <div className="flex justify-center mt-3">
        <button
          onClick={() => console.log("item clicked")}
          disabled={!checked}
          className={`px-3 py-1.5 bg-black ${
            !checked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-primary-color"
          } text-white hoverEffect rounded`}
        >
          Proceed to checkout
        </button>
        
      </div>
    </div>
  );
};

export default TotalCheckOutCard;
