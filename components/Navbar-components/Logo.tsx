"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
interface ILogoType {
  logoSrc: string;
  className?: string;
  logoText?: string;
  width?: number;
  height?: number;
}
const Logo = ({ logoSrc, className, logoText, width, height }: ILogoType) => {
  return (
    <Link href={"/ "} className="group cursor-pointer inline-flex">
      <div className="flex justify-center items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 4, -4, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          }}
        >
          <Image
            className={cn("", className)}
            src={logoSrc}
            alt="logo image"
            width={width ?? 75}
            height={height ?? 75}
          />
        </motion.div>
        <h2
          className="hoverEffect text-2xl font-extrabold font-Jost
           text-primary-color group-hover:text-secondary-color
           duration-300 tracking-[2px] hidden md:flex"
        >
          {logoText}
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
