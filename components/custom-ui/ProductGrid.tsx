"use client";
import React, { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState("See all");
  return (
    <HomeTabBar selectedTab={selectedTab} onTabSelected={setSelectedTab} />
  );
};

export default ProductGrid;
