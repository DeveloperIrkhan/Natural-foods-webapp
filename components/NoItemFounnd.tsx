import { motion } from "framer-motion";
import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface INoItemFound {
  selectedTab?: string;
  className?: string;
}
const NoItemFounnd = ({ selectedTab, className }: INoItemFound) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center py-10 min-h-80 space-y-8 text-center bg-gray-100 rounded-lg w-full mt-10",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-medium text-gray-800">
          No Product Found....
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          We&apos; re sorry, but there is not product found on the criteria at
          the moment...
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>We're restocking it shortly</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          please check back later, or explore our other product categories
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default NoItemFounnd;
