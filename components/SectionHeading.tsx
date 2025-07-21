import React from "react";

interface props {
  title: string;
  subtitle?: string;
}
const SectionHeading = ({ title, subtitle }: props) => {
  return (
    <div className="text-center my-10">
      {/* Title with horizontal lines */}
      <div className="flex items-center justify-center gap-4">
        <div className="h-[2px] w-16 bg-black"></div>
        <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide">
          {title}
        </h2>
        <div className="h-[2px] w-16 bg-black"></div>
      </div>

      {/* Subtitle */}
      <p className="text-sm italic text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default SectionHeading;
