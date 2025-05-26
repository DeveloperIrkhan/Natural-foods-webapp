import { images } from "@/public/ImagesUrls";
import Image from "next/image";
import React from "react";

const LoadingScreen = () => {
  return (
    <div
      className="z-50 w-screen h-screen fixed top-0 left-0 flex justify-center 
            items-center bg-darkColor/70 backdrop-blur-sm text-2xl"
    >
      <span className="animate-blink ml-1"> | </span>
      <span>
        <Image
          src={images.Spinner}
          alt="Loading Spinner"
          className="w-36 h-3w-36"
        />
      </span>
    </div>
  );
};

export default LoadingScreen;
