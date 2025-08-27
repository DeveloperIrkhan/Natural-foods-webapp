"use client";
import { ProductStatuses } from "@/app/constants/constants";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { ICategoryModel } from "@/interfaces/product.interface";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [productStatus, setProductStatus] = useState(ProductStatuses[0]);
  const [categories, setCategories] = useState<ICategoryModel[]>([]);
  const [inStock, setInStock] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [productImage0, setProductImage0] = useState<File | null>(null);
  const [productImage1, setProductImage1] = useState<File | null>(null);
  const [productImage2, setProductImage2] = useState<File | null>(null);
  const [productImage3, setProductImage3] = useState<File | null>(null);
  const sizes = ["250ml", "500ml", "1lt", "100g", "250g", "500g", "800g"];

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
      form.append("discountPrice", discountPrice.toString());
      form.append("category", category);
      form.append("productStatus", productStatus);
      // form.append("quantity", JSON.stringify(quantity));
      form.append("inStock", inStock.toString());
      console.log("category passing", category);
      productImage0 && form.append("productImage0", productImage0);
      productImage1 && form.append("productImage1", productImage1);
      productImage2 && form.append("productImage2", productImage2);
      productImage3 && form.append("productImage3", productImage3);
      const response = await axios.post("/api/product", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message || "data added successfully");
        setName("");
        setDescription("");
        setPrice("");
        setDiscountPrice(0);
        setProductStatus(ProductStatuses[0]);
        setInStock(0);
        setProductImage0(null);
        setProductImage1(null);
        setProductImage2(null);
        setProductImage3(null);
      } else {
        toast.error(response?.data?.message);
      }
      console.log("response data", response.data);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
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
          <div className="flex gap-4 mt-2">
            {/* <div
              onClick={() =>
                setQuantity((prev) =>
                  prev.includes("300ml")
                    ? prev.filter((item) => item !== "300ml")
                    : [...prev, "300ml"]
                )
              }
            >
              <p
                className={`bg-gray-500 text-white hover:bg-gray-700 px-3 py-1 cursor-pointer ${
                  quantity.includes("300ml") ? "bg-gray-900" : ""
                }`}
              >
                300 ml
              </p>
            </div>
            <div
              onClick={() =>
                setQuantity((prev) =>
                  prev.includes("500ml")
                    ? prev.filter((item) => item !== "500ml")
                    : [...prev, "500ml"]
                )
              }
            >
              <p
                className={`bg-gray-500 text-white hover:bg-gray-700 px-3 py-1 cursor-pointer ${
                  quantity.includes("500ml") ? "bg-gray-900" : ""
                }`}
              >
                500 ml
              </p>
            </div>
            <div
              onClick={() =>
                setQuantity((prev) =>
                  prev.includes("800ml")
                    ? prev.filter((item) => item !== "800ml")
                    : [...prev, "800ml"]
                )
              }
            >
              <p
                className={`bg-gray-500 text-white hover:bg-gray-700 px-3 py-1 cursor-pointer ${
                  quantity.includes("800ml") ? "bg-gray-900" : ""
                }`}
              >
                800 ml
              </p>
            </div> */}

            {/* {sizes.map((Item, index) => (
              <div
                onClick={() => {
                  setQuantity((prev) =>
                    prev.includes(Item)
                      ? prev.filter((size) => size !== Item)
                      : [...prev, Item]
                  );
                }}
                className=""
                key={index}
              >
                <p
                  className={`bg-gray-500 text-white hover:bg-gray-700 px-3 py-1 cursor-pointer
                 ${quantity.includes(Item) ? "bg-gray-900" : ""}`}
                >
                  {Item}
                </p>
              </div>
            ))} */}
          </div>
          <div className="flex flex-col gap-3 my-2">
            <div className={`${inputTextStyle} w-[50%]`}>
              <select
                onChange={(e) => {
                  setProductStatus(e.target.value);
                }}
                className="form-control w-full"
              >
                {ProductStatuses.map((item, index) => {
                  return (
                    <option className="w-full" key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {productStatus === "sale" && (
            <input
              name="discountPrice"
              type="number"
              placeholder="discount Price"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(Number(e.target.value))}
              required
              className={inputTextStyle}
            />
          )}
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
              className={inputTextStyle}
              name="inStock"
              type="number"
              placeholder="please enter product quantity"
              onChange={(e) => setInStock(Number(e.target.value))}
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
      </div>
    </div>
  );
};

export default AddProduct;
