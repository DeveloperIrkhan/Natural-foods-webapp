import { create } from "zustand";

export interface IFavItemStore {
  productId: string;
}
export interface IFavItemStoreProps {
  favItems: IFavItemStore[];
  addToFavorite: (productId: string) => void;
  getTotalFavItems: () => number;
}
export const useFavoriteItemsStore = create<IFavItemStoreProps>((set, get) => ({
  favItems: [],
  addToFavorite: (Id: string) => {
    let favCart = [...get().favItems];
    const exists = favCart.some((item) => item.productId === Id);

    if (exists) {
      // If already exists, remove it (toggle off)
      set({
        favItems: favCart.filter((item) => item.productId !== Id)
      });
    } else {
      // If not exists, add it
      set({
        favItems: [...favCart, { productId: Id }]
      });
    }
  },

  getTotalFavItems: (): number => {
    let favCart = [...get().favItems];
    return favCart.length;
  }
}));
