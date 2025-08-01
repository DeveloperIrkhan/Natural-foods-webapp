"use client";
import React, { useEffect, useState } from "react";
import MenuButtons from "./MenuButtons";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import { motion } from "framer-motion";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/clerk-react";

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
      className={`fixed inset-x-0 bg-[#F8F3E8]/80 backdrop-blur-md top-0 left-0 right-0 z-50 py-5 md:px-6 
        transition-all duration-300
          ${
            isScrolled
              ? "hoverEffect block translate-y-0 shadow-lg text-coal"
              : "hidden translate-y-full"
          }`}
    >
      <div className="flex justify-center gap-6">
        <div className="">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
          >
            <img src="./Logo.png" className="w-14 h-1w-14" alt="" />
          </motion.div>
        </div>
        <MenuButtons />
        <div className="flex justify-center items-center gap-5">
          <CartIcon />
          <FavoriteButton />
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default SimpleNavbar;
