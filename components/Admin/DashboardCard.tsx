import { cn } from "@/lib/utils";
import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface IDashboardCardProps {
  heading: string;
  text: string;
  totalNumber: number;
  className?: string;
}
const DashboardCard = ({
  heading,
  text,
  totalNumber,
  className
}: IDashboardCardProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    const controls = animate(count, totalNumber, {
      duration: 1,
      ease: "easeOut"
    });

    const unsubscribe = rounded.on("change", (v) => {
      setDisplayNumber(v);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [totalNumber]);

  return (
    <div
      className={cn(
        "bg-gray-400 flex shadow-md flex-col justify-center items-center rounded-xl px-2 py-4",
        className
      )}
    >
      <motion.h2 className="text-xl md:text-2xl font-bold text-gray-700">
        {displayNumber}
      </motion.h2>
      <h2 className="md:text-xl font-medium text-gray-700">{heading}</h2>
      <p className="text-[15px] tracking-wide text-gray-700">{text}</p>
    </div>
  );
};

export default DashboardCard;
