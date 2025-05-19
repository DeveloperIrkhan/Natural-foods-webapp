import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface ILogoType {
  logoSrc: string;
  className?: string;
  logoText?: string;
}
const Logo = ({ logoSrc, className, logoText }: ILogoType) => {
  return (
    <Link href={"/ "} className="group cursor-pointer inline-flex">
      <div className="flex justify-center items-center gap-3">
        <Image
          className={cn("", className)}
          src={logoSrc}
          alt="logo image"
          width={80}
          height={80}
        />
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
