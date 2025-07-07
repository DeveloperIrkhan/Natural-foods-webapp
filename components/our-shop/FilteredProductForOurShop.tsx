import React, { useState } from "react";
import NoItemFounnd from "../NoItemFounnd";
import SamillerCard from "../Cards-Components/SamillerCard";
import Container from "../Container";
import { IProduct } from "@/interfaces/product.interface";

interface IFiteredProductContainer {
  product: IProduct;
}

const FilteredProductForOurShop = ({ product }: IFiteredProductContainer) => {
  return (
    <div className="">
      {product && product != null ? (
        <SamillerCard
          product={product}
          LinkTo={`${product.slug}`}
          key={product._id}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FilteredProductForOurShop;
