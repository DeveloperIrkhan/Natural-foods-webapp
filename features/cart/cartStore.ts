import { getWithExpiry, setWithExpiry } from "@/app/helpers/localStorage";
import { toast } from "react-toastify";
import { create } from "zustand";
export interface IItems {
  productId: string;
  productSize: string;
  Quantity: number;
}
interface ICartStore {
  items: IItems[];
  addToCart: (productId: string, productSize: string) => void;
  removeFromCart: (productId: string, productSize: string) => void;
  incrementQuantity: (productId: string, productSize: string) => void;
  decrementQuantity: (productId: string, productSize: string) => void;
  hydrateCartFromStorage: () => void;
  isHydrated: boolean;
}
export const useCartStore = create<ICartStore>((set, get) => ({
  // getting items from local storage for the firsttime
  isHydrated: false,
  items: [],
  hydrateCartFromStorage: () => {
    try {
      const data = getWithExpiry("cartItems");
      if (data) {
        set({ items: data });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      set({ isHydrated: true });
    }
  },
  addToCart: (productId, productSize) => {
    if (!productSize) {
      toast.error("please select size!");
      return;
    }
    const items = [...get().items];
    const index = items.findIndex(
      (item) => item.productId === productId && item.productSize === productSize
    );

    if (index > -1) {
      items[index].Quantity += 1;
    } else {
      items.push({ productId, productSize, Quantity: 1 });
    }

    set({ items });
    setWithExpiry({ key: "cartItems", value: items, timeInHours: 8 });
    toast.success("item added");
  },
  removeFromCart: (productId: string, productSize: string) => {
    let cartItems = [...get().items];
    cartItems = cartItems.filter(
      (item) =>
        !(item.productId === productId && item.productSize === productSize)
    );
    set({ items: cartItems });
    setWithExpiry({ key: "cartItems", value: cartItems, timeInHours: 8 });
    toast.success("Item removed");
    // let cartItems = [...get().items];
    // const index = cartItems.findIndex(
    //   (item) => item.productId === productId && item.productSize === productSize
    // );
    // if (index > -1) {
    //   if (cartItems[index].Quantity > 1) {
    //     cartItems[index].Quantity -= 1;
    //   } else {
    //     cartItems.splice(index, 1);
    //   }
    //   set({ items: cartItems });
    //   toast.success("Item removed");
    // } else {
    //   toast.error("Item not found in cart");
    // }
  },
  incrementQuantity: (productId: string, productSize: string) => {
    const cartItems = [...get().items];
    const index = cartItems.findIndex(
      (item) => item.productId === productId && item.productSize === productSize
    );

    if (index > -1) {
      cartItems[index].Quantity += 1;
      set({ items: cartItems });
      setWithExpiry({ key: "cartItems", value: cartItems, timeInHours: 8 });
    }
  },
  decrementQuantity: (productId: string, productSize: string) => {
    const cartItems = [...get().items];
    const index = cartItems.findIndex(
      (item) => item.productId === productId && item.productSize === productSize
    );

    if (index > -1) {
      if (cartItems[index].Quantity > 1) {
        cartItems[index].Quantity -= 1;
      } else {
        cartItems.splice(index, 1);
      }
      set({ items: cartItems });
      setWithExpiry({ key: "cartItems", value: cartItems, timeInHours: 8 });
    }
  }

  // #end
}));
