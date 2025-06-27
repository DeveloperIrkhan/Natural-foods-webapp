"use client";
import { usePostBlogsMutation } from "@/features/blogs/BlogAPI";
import { FilePlus2, Loader2 } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string[]>([""]);
  const [auther, setAuther] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [postBlog] = usePostBlogsMutation();
  const addParagraph = () => {
    setContent([...content, ""]);
  };
  const handleContentChange = (index: number, value: string) => {
    const updatedContext = [...content];
    updatedContext[index] = value;
    setContent(updatedContext);
  };
  const removeParagraph = (index: number) => {
    const updated = content.filter((_, i) => i !== index);
    setContent(updated);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const blogFormData = new FormData();
      blogFormData.append("title", title);
      content.forEach((para) => blogFormData.append("content", para));
      blogFormData.append("auther", auther);
      thumbnail && blogFormData.append("thumbnail", thumbnail);

      const response = await postBlog(blogFormData).unwrap();
      console.log("response", response);
    } catch (error: any) {
      console.error("Blog submission error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Create Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-row  md:justify-normal justify-center items-center gap-3">
            <label
              htmlFor="productImage0"
              className="border-2 border-dashed w-32 h-32 md:w-64 md:h-64 flex justify-center items-center"
            >
              <img
                src={thumbnail ? URL.createObjectURL(thumbnail) : "/Upload.png"}
                className={`${
                  thumbnail != null
                    ? "w-full h-full"
                    : "w-9 h-9 md:w-32 md:h-32"
                }`}
                alt=""
              />
              <input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setThumbnail(file);
                }}
                type="file"
                accept="image/*"
                name="productImage0"
                id="productImage0"
                hidden
              />
            </label>
          </div>
          <div className="">
            <input
              name="title"
              type="text"
              placeholder="blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={"input-custom-style"}
            />
          </div>
          <div className="">
            <input
              name="auther"
              type="text"
              placeholder="auther"
              value={auther}
              onChange={(e) => setAuther(e.target.value)}
              required
              className={"input-custom-style"}
            />
          </div>
          <div className="space-y-3">
            {content.map((para, index) => (
              <div key={index} className="relative">
                <textarea
                  name={`paragraph-${index}`}
                  placeholder={`paragraph-${index + 1}`}
                  value={para}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  className={"input-custom-style"}
                />
                {content.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(index)}
                    className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div
            onClick={addParagraph}
            className="hover:cursor-pointer hover:border-gray-900 border border-dashed  border-gray-600 flex items-center px-5 py-2"
          >
            <FilePlus2 className="hover:text-gray-900 text-gray-600 m-auto" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black w-1/3 text-white py-2 px-3 rounded-sm
              hover:translate-y-1 hoverEffect transition-all 
              hover:shadow-[0_0_15px_rgba(0_0_0/0.5)] flex gap-4 justify-center"
          >
            {loading && <Loader2 className="text-white w-6 h-6 animate-spin" />}
            {loading ? "Submitting..." : "Save Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
