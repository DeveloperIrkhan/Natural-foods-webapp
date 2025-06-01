"use client";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import LoadingScreen from "../Loading/LoadingScreen";
import HomeCard from "../Cards-Components/HomeCard";
import axios from "axios";

interface IProductType {
  _id: string;
  name: string;
  category: string;
  images: string[];
  inStock: boolean;
  slug: string;
  price: number;
  description: string;
}

const ProductGrid = () => {
  const [products, setProducts] = useState<IProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/product");
        const data = response.data;
        if (data.success) {
          setProducts(data.product);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="m-5">
      {isLoading && (
        <LoadingScreen
          text="please wait products is fetching...!"
          onComplete={() => {
            if (products) {
              setIsLoading(false);
            }
          }}
        />
      )}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 md:gap-3 gap-2">
          {products.map((product) => (
            <HomeCard
              id={product._id}
              key={product._id}
              image={product.images}
              price={product.price}
              title={product.name}
              description={product.description}
              buttonText="Add to Cart"
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductGrid;
