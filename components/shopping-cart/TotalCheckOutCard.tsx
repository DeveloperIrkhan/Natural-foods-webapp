import React, { useState } from "react";
import PageTitle, { Textsm } from "../PageTitle";

const TotalCheckOutCard = () => {
  let subtotal = 1190;
  let discount = 140;
  let shippingcharges = 500;
  let total = subtotal - discount + shippingcharges;
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
          <p>Rs/- {subtotal.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Discount</p>
          <p className="text-red-500">Rs/- {discount.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <p>Rs/- {shippingcharges.toFixed(2)}</p>
        </div>
      </div>
      <hr className="my-5" />
      <Textsm className="text-gray-700 text-[20px] font-bold">
        Total Rs/- {total.toFixed(2)}
      </Textsm>

      <label className="flex items-center space-x-2 text-sm gap-3">
        <input
          name="inStock"
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          //   onChange={(e) => setInStock(e.target.checked)}
        />
        I agreed with the terms and conditions
      </label>
      <div className="flex justify-center mt-3">
        <button className="px-3 py-1.5 bg-black text-white hoverEffect hover:bg-primary-color rounded">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default TotalCheckOutCard;
