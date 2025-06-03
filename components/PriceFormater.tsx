import { cn } from "@/lib/utils";
import React from "react";

interface IPriceFormater {
  amount: number | undefined;
  className: string | undefined;
}

const PriceFormater = ({ amount, className }: IPriceFormater) => {
  const PriceFormater = new Number(amount).toLocaleString("eu-US", {
    currency: "PKR",
    style: "currency",
    maximumFractionDigits: 2
  });
  return (
    <span className={cn("text-sm font-semibold", className)}>
      {PriceFormater}
    </span>
  );
};

export default PriceFormater;
