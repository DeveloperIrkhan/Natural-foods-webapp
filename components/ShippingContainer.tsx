import React from "react";
import Container from "./Container";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

export const extraShippingData = [
  {
    title: "Free Delivery",
    description: "Free Shipping over Rs/-4000",
    icon: <Truck size={50} strokeWidth={1}/>
  },
  {
    title: "Free Return Policy",
    description: "Free Return over Rs/-5000",
    icon: <GitCompareArrows size={50} strokeWidth={1} />
  },
  {
    title: "Customer Support",
    description: "Friendly 24/7 support to our valuable Customers",
    icon: <Headset size={50} strokeWidth={1}/>
  },
  {
    title: "Money Back Gurantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={50} strokeWidth={1}/>
  }
];
const ShippingContainer = () => {
  return (
    <Container className="m-5">
      <div className="flex justify-center flex-wrap gap-4">
        {extraShippingData.map((item) => (
          <div
            className="flex justify-center items-center group hover:translate-y-2 shadow-lg hover:shadow-xl hoverEffect min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] p-3 rounded-md bg-gray-50"
            key={item.title}
          >
            <div className="flex flex-col items-center gap-4 justify-center">
              <p className="text-lg font-bold text-gray-800">{item.title}</p>
              <p className="font-normal">{item.icon}</p>
              <p className="font-normal text-gray-700 text-sm text-center">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ShippingContainer;
