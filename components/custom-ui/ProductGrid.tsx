"use client";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import LoadingScreen from "../Loading/LoadingScreen";
import HomeCard from "../Cards-Components/HomeCard";
import axios from "axios";
import HomeTabBar from "./HomeTabBar";

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState("See all");
  return (
    <HomeTabBar selectedTab={selectedTab} onTabSelected={setSelectedTab} />
  );
};

export default ProductGrid;
