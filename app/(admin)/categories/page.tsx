"use client";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import PageTitle from "@/components/PageTitle";
import SectionHeading from "@/components/SectionHeading";
import { useGetCategoryQuery } from "@/features/category/categoryAPI";
import { Edit, Eye, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const page = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const [editCategory, setEditCategory] = useState<any>(null);

  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name);
      setDescription(editCategory.description);
      setCategoryImage(editCategory.categoryImage);
    }
  }, [editCategory]);
  const { data, isLoading: categoryLoading } = useGetCategoryQuery();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPageLoading(true);

    if (editCategory) {
      console.log("Updating category:", {
        id: editCategory._id,
        name,
        description,
        categoryImage
      });
    } else {
      console.log("Adding new category:", { name, description, categoryImage });
    }

    setPageLoading(false);
    setEditCategory(null);
    setName("");
    setDescription("");
    setCategoryImage(null);
  };
  return (
    <div>
      {/* {categoryLoading && <LoadingScreen text="we are fetching categories" />} */}
      <SectionHeading
        textColor="text-primary-color"
        lineColor="bg-primary-color"
        title="Category"
        subtitle="this page manage all Categories"
      />

      <div className="flex flex-col">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {data?.categories.map((signleCategory) => (
            <div
              key={signleCategory._id}
              className="px-4 py-4 bg-white rounded-xl hover:shadow-lg duration-200 shadow-md flex flex-row items-center gap-4"
            >
              {/* Image */}
              <div className="h-24 w-24 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  className="h-full w-full object-cover"
                  src={signleCategory.categoryImage}
                  alt="product image"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-1">
                <h2 className="text-sm md:text-base font-semibold">
                  {signleCategory.name}
                </h2>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  written by {signleCategory.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-row gap-2">
                <Edit
                  onClick={() => setEditCategory(signleCategory)}
                  className="hoverEffect w-4 md:h-5 h-4 md:w-5 text-blue-400 hover:text-blue-600 cursor-pointer"
                />
                <Trash2 className="hoverEffect w-4 md:h-5 h-4 md:w-5 text-red-400 hover:text-red-600 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full p-4 bg-white shadow-lg rounded-lg"
        >
          <PageTitle className="text-center text-shadow-xs font-normal text-shadow-primary-color capitalize tracking-widest">
            Edit Category
          </PageTitle>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-1/4 flex justify-center">
              <label
                htmlFor="productImage0"
                className="border-2 border-dashed w-32 h-32 md:w-64 md:h-64 flex justify-center items-center"
              >
                <img
                  src={
                    categoryImage instanceof File
                      ? URL.createObjectURL(categoryImage)
                      : editCategory?.categoryImage || "/Upload.png"
                  }
                  className={`${
                    categoryImage instanceof File || editCategory?.categoryImage
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
            <div className="w-full md:w-3/4 space-y-3">
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
                className="relative group overflow-hidden h-10 px-4 py-1 rounded-md max-w-xl shadow-2xl 
              text-white text-sm font-medium flex items-center justify-center gap-2 bg-primary-color"
              >
                <span
                  className="absolute inset-0  transform -translate-x-full group-hover:translate-x-0 
                transition-transform duration-300 ease-out z-0 bg-black"
                ></span>
                <span className="relative z-10 flex items-center gap-2">
                  {pageLoading ? "Submitting..." : "Update Product"}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
