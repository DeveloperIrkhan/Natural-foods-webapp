"use client";
import { images } from "@/public/ImagesUrls";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface ILoadingScreenProps {
  text?: string;
  onComplete?: () => void;
}
const LoadingScreen = ({ text, onComplete }: ILoadingScreenProps) => {
  const [loadingText, setLoadingText] = useState<string>("");
  useEffect(() => {
    let index = 1;
    const interval = setInterval(() => {
      setLoadingText((text || "").substring(0, index));
      index++;
      if (index > (text || "").length) {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);
  return (
    <div
      className="z-50 w-screen h-screen fixed top-0 left-0 flex justify-center 
            items-center bg-darkColor/70 backdrop-blur-sm text-2xl"
    >
      <div className="flex flex-col justify-center items-center">
        <p className="bg-primary-color/70 rounded-xl px-4 py-1 backdrop-blur-sm text-xl md:text-2xl flex items-center justify-center">
          <span>{loadingText}</span>
          <span className="animate-blink ml-1"> | </span>
        </p>
        <Image
          src={images.Spinner}
          alt="Loading Spinner"
          className="w-36 h-3w-36"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
