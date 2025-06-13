"use client";

import Container from "@/components/Container";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { selectProductList } from "@/features/product/productSlice";

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const productList = useSelector(selectProductList);
  const product = productList.find((item) => item.slug === slug);
  // );

  useEffect(() => {
    console.log("slug:", slug);
    console.log("Redux stored products:", productList);
    // console.log("Product:", product);
  }, [slug, productList]);

  return (
    <Container>
      <h2 className="text-xl font-bold mb-4">Product Details</h2>
      {product ? (
        <div>
          <p>Title: {product.name}</p>
          <p>Description: {product.description}</p>
          <img src={product.images[0]} alt={product.name} width={300} />
        </div>
      ) : (
        <p>Product not found for slug: {slug}</p>
      )}
    </Container>
  );
};

export default Page;
