"use client";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        "/api/category",
        { name, description },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" flex justify-center items-center">
      <div className="w-lg mx-auto p-4 bg-white rounded-lg shadow-xl">
        {isLoading && <LoadingScreen />}
        <h1 className="text-2xl font-semibold mb-4 capitalize">
          Create category
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={"custom-input"}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={"custom-input"}
          />

          <button
            type="submit"
            className="bg-black w-1/3 text-white py-2 px-3 rounded-sm
              hover:translate-y-1 hoverEffect transition-all 
              hover:shadow-[0_0_15px_rgba(0_0_0/0.5)]"
          >
            {isLoading ? "Submitting..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
