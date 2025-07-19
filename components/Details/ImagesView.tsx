import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  images: string[];
}
const ImagesView = ({ images }: Props) => {
  const [displayImage, setDisplayImage] = useState<string>("");
  useEffect(() => {
    if (images.length > 0) {
      setDisplayImage(images[0]);
    }
  }, [images]);

  if (!displayImage) return null;
  return (
    <AnimatePresence mode="wait">
      <div className="w-full md:w-1/2 px-10 py-3 flex justify-center flex-col items-center">
        <motion.div
          key={displayImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden w-full h-[550px] md:h-[550px] rounded-md"
        >
          <motion.img
            key={displayImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-fit h-auto object-cover duration-300 overflow-hidden rounded-xl 
        shadow-lg hover:scale-110 hover:rotate-2"
            src={displayImage}
            alt={`image-${displayImage}`}
            width={300}
          />
        </motion.div>
        <div className="grid grid-cols-6 mt-5 gap-2 h-20 md:h-24">
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className={`w-full h-auto object-contain cursor-pointer rounded-md hoverEffect ${
                displayImage === img ? "ring-2 ring-primary-color opacity-100" : "ring-1 ring-gray-400 opacity-50"
              }`}
              width={100}
              height={100}
              onClick={() => setDisplayImage(img)}
            />
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default ImagesView;
