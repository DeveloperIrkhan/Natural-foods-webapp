import { create } from "zustand";
import { IProduct } from "@/interfaces/product.interface";

//creating interface

interface IProductStoreStates {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
}

export const useProductsStore = create<IProductStoreStates>((set) => ({
  products: [],
  setProducts: (products) => {
    set({ products });
  }
}));
