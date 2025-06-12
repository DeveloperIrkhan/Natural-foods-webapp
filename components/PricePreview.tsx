import React from "react";
import PriceFormater from "./PriceFormater";

interface IPricePreview {
  price: number;
  discountPrice: number;
}
const PricePreview = ({ price, discountPrice }: IPricePreview) => {
  return (
    <div className="flex gap-3 items-center">
      <span
        className={`text-sm text-gray-700 ${
          discountPrice > 0 ? "line-through" : "font-medium"
        }`}
      >
        <PriceFormater amount={price} className={"text-sm text-gray-600"} />
      </span>
      {discountPrice > 0 && (
        <span className="">
          <PriceFormater
            amount={discountPrice}
            className={"text-sm font-bold text-red-600"}
          />
        </span>
      )}
    </div>
  );
};

export default PricePreview;
