import Banner from "@/components/Banner/Banner";
import Container from "@/components/Container";
import ItemBarCard from "@/components/shopping-cart/ItemBarCard";
import TotalCheckOutCard from "@/components/shopping-cart/TotalCheckOutCard";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="bg-gray-100">
      <Banner text="Dashboard" media="/Slider-2.png" />
      <Container className="flex md:flex-row flex-col gap-3 py-10">
        <div className="w-full md:w-3/4 flex justify-center flex-col space-y-3">
          <ItemBarCard />
          <ItemBarCard />
          <ItemBarCard />
        </div>
        <div className="w-full md:w-1/4 flex justify-center">
        <TotalCheckOutCard/>
        </div>
      </Container>
    </div>
  );
};

export default page;
