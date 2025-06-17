import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  image: string;
  className?: string;
};

const HeartIcon = ({ image, className }: Props) => {
  return (
    <div className={cn("cursor-pointer", className)}>
      <img src={image} alt="image" className="w-10 h-10" />
    </div>
  );
};

export default HeartIcon;
