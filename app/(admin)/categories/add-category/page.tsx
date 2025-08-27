"use client";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (categoryImage) {
        formData.append("categoryImage", categoryImage);
      }
      setIsLoading(true);
      const response = await axios.post("/api/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
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
          <div className="flex justify-center">
            <label
              htmlFor="productImage0"
              className="border-2 border-dashed w-32 h-32 md:w-64 md:h-64 flex justify-center items-center"
            >
              <img
                src={
                  categoryImage
                    ? URL.createObjectURL(categoryImage)
                    : "/Upload.png"
                }
                className={`${
                  categoryImage != null
                    ? "w-full h-full"
                    : "w-9 h-9 md:w-32 md:h-32"
                }`}
                alt=""
              />
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setCategoryImage(file);
                }}
                type="file"
                accept="image/*"
                name="productImage0"
                id="productImage0"
                hidden
              />
            </label>
          </div>
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
