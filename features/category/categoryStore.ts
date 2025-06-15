import { create } from "zustand";
import { ICategory } from "@/interfaces/product.interface";

//creating interface

interface ICategoryStoreState {
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
}

export const useCategoryStore = create<ICategoryStoreState>((set) => ({
  categories: [],
  setCategories: (categories) => {
    set({ categories });
  }
}));
