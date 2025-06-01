"use client";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import axios from "axios";
import React, { useEffect, useState } from "react";
interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
}
const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [inStock, setInStock] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [productImage0, setProductImage0] = useState<File | null>(null);
  const [productImage1, setProductImage1] = useState<File | null>(null);
  const [productImage2, setProductImage2] = useState<File | null>(null);
  const [productImage3, setProductImage3] = useState<File | null>(null);

  const inputTextStyle =
    "border px-2 py-1.5 rounded-lg w-full focus:outline-none focus:border-primary-color";
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData();
      form.append("name", name);
      form.append("description", description);
      form.append("price", price);
      form.append("category", category);
      form.append("inStock", inStock.toString());
      console.log("category passing", category);
      productImage0 && form.append("productImage0", productImage0);
      productImage1 && form.append("productImage1", productImage1);
      productImage2 && form.append("productImage2", productImage2);
      productImage3 && form.append("productImage3", productImage3);
      const response = await axios.post("/api/product", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("response", response);
      console.log("response data", response.data);
      setMessage(response.data.message || "data added successfully");
    } catch (error) {
      console.log(error);
      setMessage("some error");
    } finally {
      setLoading(false);
    }
  };
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const categories = await axios.get("/api/category");
      setCategories(categories?.data?.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories]);
  return (
    <div>
      <div className="max-w-xl mx-auto p-4">
        {loading && <LoadingScreen />}
        <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-row  md:justify-normal justify-center items-center gap-3">
            <label
              htmlFor="productImage0"
              className="border-2 border-dashed w-16 h-16 md:w-32 md:h-32 flex justify-center items-center"
            >
              <img
                src={
                  productImage0
                    ? URL.createObjectURL(productImage0)
                    : "/Upload.png"
                }
                className={`${
                  productImage0 != null
                    ? "w-full h-full"
                    : "w-9 h-9 md:w-16 md:h-16"
                }`}
                alt=""
              />
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setProductImage0(file);
                }}
                type="file"
                accept="image/*"
                name="productImage0"
                id="productImage0"
                hidden
              />
            </label>
            <label
              htmlFor="productImage1"
              className="border-2 border-dashed w-16 h-16 md:w-32 md:h-32 flex justify-center items-center"
            >
              <img
                src={
                  productImage1
                    ? URL.createObjectURL(productImage1)
                    : "/Upload.png"
                }
                className={`${
                  productImage1 != null
                    ? "w-full h-full"
                    : "w-9 h-9 md:w-16 md:h-16"
                }`}
                alt=""
              />
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setProductImage1(file);
                }}
                type="file"
                id="productImage1"
                accept="image/*"
                name="productImage1"
                hidden
              />
            </label>
            <label
              htmlFor="productImage2"
              className="border-2 border-dashed w-16 h-16 md:w-32 md:h-32 flex justify-center items-center"
            >
              <img
                src={
                  productImage2
                    ? URL.createObjectURL(productImage2)
                    : "/Upload.png"
                }
                className={`${
                  productImage2 != null
                    ? "w-full h-full"
                    : "w-9 h-9 md:w-16 md:h-16"
                }`}
                alt=""
              />
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setProductImage2(file);
                }}
                type="file"
                id="productImage2"
                accept="image/*"
                hidden
              />
            </label>
            <label
              htmlFor="productImage3"
              className="border-2 border-dashed w-16 h-16 md:w-32 md:h-32 flex justify-center items-center"
            >
              <img
                src={
                  productImage3
                    ? URL.createObjectURL(productImage3)
                    : "/Upload.png"
                }
                className={`${
                  productImage3 != null
                    ? "w-full h-full"
                    : "w-9 h-9 md:w-16 md:h-16"
                }`}
                alt=""
              />
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setProductImage3(file);
                }}
                type="file"
                id="productImage3"
                accept="image/*"
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
            className={inputTextStyle}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputTextStyle}
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className={inputTextStyle}
          />
          <div className="flex flex-col gap-3 my-2">
            <div className={`${inputTextStyle} w-[50%]`}>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="form-control w-full"
              >
                {categories &&
                  categories.map((item) => {
                    return (
                      <option
                        className="w-full"
                        key={item._id}
                        value={item._id}
                      >
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <label className="flex items-center space-x-2">
            <input
              name="inStock"
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
            <span>In Stock</span>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="bg-black w-1/3 text-white py-2 px-3 rounded-sm
              hover:translate-y-1 hoverEffect transition-all 
              hover:shadow-[0_0_15px_rgba(0_0_0/0.5)]"
          >
            {loading ? "Submitting..." : "Create Product"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
