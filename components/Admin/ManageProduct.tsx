import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
interface Props {
  className?: string;
  shortText?: string;
  productName?: string;
  linkTo: string;
}
const ManageProduct = ({
  className,
  shortText,
  productName,
  linkTo
}: Props) => {
  return (
    <Link href={`${linkTo}`}>
      <div
        className={cn(
          "bg-gray-100 flex  shadow-md  flex-col justify-center items-center rounded-xl px-2 py-4",
          className
        )}
      >
        <p className="text-[15px] tracking-wide text-gray-700">{shortText}</p>
        <h2 className="text-xl md:text-2xl font-bold text-gray-700">
          {productName}
        </h2>
      </div>
    </Link>
  );
};

export default ManageProduct;
