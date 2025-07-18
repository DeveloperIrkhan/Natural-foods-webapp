import { CornerDownLeft, NotebookText, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

const AdditionalInformation = () => {
  return (
    <div className="flex flex-col gap-2.5 p-3">
      <div className="flex flex-row gap-3 items-center  border-b">
        <span>
          <CornerDownLeft size={35} strokeWidth={1} className="text-gray-500" />
        </span>
        <div className="flex flex-col">
          <p className="font-medium text-gray-600 font-Jost">Return Policy</p>
          <p className="font-light text-sm text-gray-500 font-Jost">
            For more information visit <Link className="text-blue-500 text-sm italic" href="/ReturnPolicy">Return Policy</Link>
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-3 items-center  border-b">
        <span>
          <Truck size={35} strokeWidth={1} className="text-gray-500" />
        </span>
        <div className="flex flex-col">
          <p className="font-medium text-gray-600 font-Jost">Free Shipping</p>
          <p className="font-light text-[14px] text-gray-500 font-Jost">
            Free Shipping on orders over Rs/- 2500
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-3 items-center  border-b">
        <span>
          <NotebookText size={35} strokeWidth={1} className="text-gray-500" />
        </span>
        <div className="flex flex-col">
          <p className="font-medium text-gray-600 font-Jost">Term & Conditions</p>
          <p className="font-light text-[14px] text-gray-500 font-Jost">
            For more visit <Link className="text-blue-500 text-sm italic" href="/TermsConditions">Term & Conditions</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
