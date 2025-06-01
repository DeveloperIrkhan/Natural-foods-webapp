"use client";
import Container from "@/components/Container";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import PageTitle from "@/components/PageTitle";
import React, { useState } from "react";

const page = () => {
  const [loading, setLoading] = useState(true);
  return (
    <Container>
      {loading && (
        <LoadingScreen
          text="please wait sir!"
          onComplete={() => setLoading(false)}
        />
      )}
      <PageTitle>Our Blogs</PageTitle>

      <p className="py-3">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint quos
        itaque error officia inventore dolor perspiciatis maiores blanditiis!
        Aliquid quisquam quam sit unde sapiente beatae dignissimos aspernatur
        enim at labore!
      </p>
    </Container>
  );
};

export default page;
