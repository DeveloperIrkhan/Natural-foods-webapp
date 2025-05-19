import { cn } from "@/lib/utils";
import React from "react";
interface IPageTitleProps {
  text: string;
}
const PageTitle = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "py-3 md:py-5 font-bold font-Jost text-primary-color capitalize text-xl md:text-2xl",
        className
      )}
    >
      {children}
    </h2>
  );
};
export default PageTitle;

export const Textsm = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-sm font-Jost text-gray-700", className)}>
      {children}
    </p>
  );
};
