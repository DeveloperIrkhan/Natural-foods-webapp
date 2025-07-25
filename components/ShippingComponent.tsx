// SuccessStories.tsx
import React from "react";
import { FaBullhorn } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { BsSoundwave } from "react-icons/bs";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const successData = [
  {
    icon: <Truck size={50} className="text-black text-xl" strokeWidth={1} />,
    title: "Free Delivery",
    subtitle: "Free Shipping over Rs/-2500",
    description:
      "Enjoy fast and reliable delivery at no extra cost when your order exceeds Rs/-2500. We ensure timely shipping right to your doorstep.",
    link: "#"
  },
  {
    icon: (
      <GitCompareArrows
        size={50}
        className="text-black text-xl"
        strokeWidth={1}
      />
    ),
    title: "Free Return Policy",
    subtitle: "Free Return over Rs/-5000",
    description:
      "Shop with confidence! Orders above Rs/-5000 are eligible for free returns—no questions asked. Your satisfaction is our priority.",
    link: "#"
  },
  {
    icon: <Headset size={50} className="text-black text-xl" strokeWidth={1} />,
    title: "Customer Support",
    subtitle: "Friendly 24/7 support to our valuable Customers",
    description:
      "Need help? Our dedicated support team is available around the clock to assist you with any queries or concerns.",
    link: "#"
  },
  {
    icon: (
      <ShieldCheck size={50} className="text-black text-xl" strokeWidth={1} />
    ),
    title: "Money Back Guarantee",
    subtitle: "Quality checked by our team",
    description:
      "We stand by the quality of our products. If you're not satisfied, get a full refund with our hassle-free money-back guarantee.",
    link: "#"
  }
];

const ShippingComponent = () => {
  return (
    <section className="bg-[#0f0f0f] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          lineColor="bg-white"
          subtitleColor="text-gray-100"
          textColor="text-white"
          title="Success stories"
          subtitle="Some of our latest projects we have been proudly working on."
        />
        <h2 className="text-3xl font-bold mb-2"></h2>
        <p className="text-gray-400 mb-10"></p>

        <div className="grid md:grid-cols-4 gap-6">
          {successData.map((item, idx) => (
            <div key={idx} className="group h-full">
              <div
                className="h-full flex flex-col justify-between
          bg-[#181818] group-hover:cursor-pointer 
          group-hover:bg-gradient-to-b group-hover:from-[#181818] group-hover:to-[#323232] 
          duration-300 border border-gray-600 group-hover:border-gray-300 rounded-lg p-6 transition-colors"
              >
                <div>
                  <div className="bg-primary-color w-10 h-10 p-1 rounded-full flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <h4 className="text-white font-semibold mt-1">
                    {item.subtitle}
                  </h4>
                  <p className="text-gray-400 mt-2">{item.description}</p>
                </div>

                <a
                  href={item.link}
                  className="text-primary-color hover:underline font-semibold mt-6 group-hover:text-white transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShippingComponent;
