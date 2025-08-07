import { cn } from "@/lib/utils";
import React from "react";

interface props {
  buttonText: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  disabled?: boolean;
  onClickFuntion: () => void;
  icon?: React.ReactNode;
}
const CustomButton = ({
  buttonColor,
  buttonHoverColor,
  buttonText,
  disabled,
  onClickFuntion,
  icon
}: props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClickFuntion}
      className={`relative overflow-hidden h-10 px-4 py-1 rounded-full text-white text-sm font-medium flex items-center justify-center gap-2 ${
        buttonColor || "bg-primary-color"
      } ${disabled && "bg-primary-color/70 cursor-not-allowed"}`}
    >
      <span
        className={`absolute inset-0  transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 ${
          buttonHoverColor || "bg-black"
        }`}
      ></span>
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {buttonText}
      </span>
    </button>
  );
};

export default CustomButton;
