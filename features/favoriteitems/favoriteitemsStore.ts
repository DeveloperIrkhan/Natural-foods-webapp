import { getWithExpiry, setWithExpiry } from "@/app/helpers/localStorage";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface IFavItemStore {
  productId: string;
}
export interface IFavItemStoreProps {
  favItems: IFavItemStore[];
  addToFavorite: (productId: string) => void;
  getTotalFavItems: () => number;
  hydrateFavoritiesFromStorage: () => void;
  isHydrated: boolean;
}
export const useFavoriteItemsStore = create<IFavItemStoreProps>((set, get) => ({
  favItems: [],
  isHydrated: false,

  addToFavorite: (Id: string) => {
    let favCart = [...get().favItems];
    const exists = favCart.some((item) => item.productId === Id);

    if (exists) {
      // If already exists, remove it (toggle off)
      const updated = favCart.filter((item) => item.productId !== Id);
      set({
        favItems: updated
      });
      setWithExpiry<IFavItemStore[]>({
        key: "favItems",
        value: updated,
        timeInHours: 8
      });
      toast.success("Item removed from favorites", { autoClose: 1500 });
    } else {
      const updated = [...favCart, { productId: Id }];
      set({ favItems: updated });
      setWithExpiry<IFavItemStore[]>({
        key: "favItems",
        value: updated,
        timeInHours: 8
      });
      toast.success("Item added to favorites", { autoClose: 1500 });
    }
  },

  getTotalFavItems: (): number => {
    let favCart = [...get().favItems];
    return favCart.length;
  },
  hydrateFavoritiesFromStorage: () => {
    try {
      const data = getWithExpiry<IFavItemStore[]>("favItems");
      if (data) {
        set({ favItems: data });
      }
    } catch (error) {
      console.error(error);
    } finally {
      set({ isHydrated: true });
    }
  }
}));
