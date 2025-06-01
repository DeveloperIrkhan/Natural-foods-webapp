import React from "react";

type IbannerProps = { text: string; media?: string };

const Banner = ({ text, media }: IbannerProps) => {
  return (
    <div className="w-full h-[250px] relative">
      <img
        src={media ?? "/banner.png"}
        alt=""
        className="w-full h-full object-cover"
      />
      <h2 className="shadow-xl absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center text-gray-100 text-2xl font-bold">
        {text}
      </h2>
    </div>
  );
};

export default Banner;
