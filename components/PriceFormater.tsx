import { cn } from "@/lib/utils";
import React from "react";

interface IPriceFormater {
  amount: number;
  className?: string;
}

const PriceFormater = ({ amount, className }: IPriceFormater) => {
  const PriceFormater = new Number(amount).toLocaleString("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 2
  });
  return (
    <span className={cn("text-sm font-semibold", className)}>
      {PriceFormater}
    </span>
  );
};

export default PriceFormater;
