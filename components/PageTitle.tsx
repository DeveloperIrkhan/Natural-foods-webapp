import React from "react";
interface IPageTitleProps {
  text: string;
}
const PageTitle = ({ text }: IPageTitleProps) => {
  return <div className="py-3 md:py-5 font-bold font-Jost text-primary-color capitalize text-xl md:text-3xl">{text}</div>;
};

export default PageTitle;
