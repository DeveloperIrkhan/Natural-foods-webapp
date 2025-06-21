"use client";
import React, { useEffect, useState } from "react";
import MenuButtons from "./MenuButtons";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import AdminMenu from "./AdminMenu";

const SimpleNavbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bg-[#F8F3E8] top-0 left-0 right-0 z-50 py-5 md:px-6 
        transition-all duration-300
          ${
            isScrolled
              ? "hoverEffect block translate-y-0 shadow-lg text-coal"
              : "hidden translate-y-full"
          }`}
    >
      <div className="flex justify-center gap-6">
        <MenuButtons />
        <div className="flex gap-5">
          <CartIcon />
          <FavoriteButton />
        </div>
      </div>
    </div>
  );
};

export default SimpleNavbar;
