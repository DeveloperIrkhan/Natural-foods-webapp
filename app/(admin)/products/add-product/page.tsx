"use client";
import axios from "axios";
import React, { useState } from "react";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const inputTextStyle =
    "border px-2 py-1.5 rounded-lg w-full focus:outline-none focus:border-primary-color";
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("image", image);
    formdata.append("category", category);
    formdata.append("inStock", inStock.toString());

    try {
      setLoading(true);
      const response = await axios.post("/api/product", formdata, {
        headers: { "Content-Type": "application/json" }
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
  return (
    <div>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <input
            name="image"
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={inputTextStyle}
          />
          {/* <label
          htmlFor="productImage0"
          className="border-2 border-dashed w-16 h-16 md:w-32 md:h-32 flex justify-center items-center"
        >
          <img
            src={image ? URL.createObjectURL(image) : images.Upload}
            className={`${
              image != null ? "w-full h-full" : "w-9 h-9 md:w-16 md:h-16"
            }`}
            alt=""
          />
          <input
            onChange={(e) => setProductImage0(e.target.files[0])}
            type="file"
            id="productImage0"
            hidden
          />
        </label> */}
          <input
            name="category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputTextStyle}
          />
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
