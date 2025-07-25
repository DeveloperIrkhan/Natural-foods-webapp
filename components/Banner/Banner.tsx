import React from "react";

type IbannerProps = { text: string; media?: string };

const Banner = ({ text, media }: IbannerProps) => {
  return (
    <div className="w-full h-[350px] relative">
  <img
    src={media ?? "/banner.png"}
    alt=""
    className="w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10"></div>

  {/* Centered Text */}
  <h2 className="absolute inset-0 flex justify-center items-center text-gray-100 md:text-4xl text-2xl font-bold z-20 shadow-xl">
    {text}
  </h2>
</div>

  );
};

export default Banner;
