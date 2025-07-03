import { IBlog } from "@/interfaces/product.interface";
import { create, createStore } from "zustand";

interface IBlogStore {
  blogs: IBlog[];
  setBlogs: (blogs: IBlog[]) => void;
}

export const useBlogsStore = create<IBlogStore>((set) => ({
  blogs: [],
  setBlogs: (blogs) => {
    set({ blogs });
  }
}));
