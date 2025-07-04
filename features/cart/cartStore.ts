import { getWithExpiry, setWithExpiry } from "@/app/helpers/localStorage";
import { toast } from "react-toastify";
import { create } from "zustand";
import { useProductsStore } from "../product/productStore";
export interface IItems {
  productId: string;
  // productSize: string;
  Quantity: number;
}
interface ICartStore {
  items: IItems[];
  // addToCart: (productId: string, productSize: string) => void;
  // removeFromCart: (productId: string, productSize: string) => void;
  // incrementQuantity: (productId: string, productSize: string) => void;
  // decrementQuantity: (productId: string, productSize: string) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  hydrateCartFromStorage: () => void;
  getCartAmount: () => void;
  getDiscountTotal: () => void;
  isHydrated: boolean;
  totalAmountAfter: number;
  settotalAmountAfter: (totalAmountAfter: number) => void;
}
export const useCartStore = create<ICartStore>((set, get) => ({
  // getting items from local storage for the firsttime
  isHydrated: false,
  totalAmountAfter: 0,
  settotalAmountAfter: (amount) => {
    set({ totalAmountAfter: amount });
  },
  items: [],
  hydrateCartFromStorage: () => {
    try {
      const data = getWithExpiry<IItems[]>("cartItems");
      if (data) {
        set({ items: data });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      set({ isHydrated: true });
    }
  },
  // addToCart: (productId, productSize) => {
  addToCart: (productId) => {
    // if (!productSize) {
    //   toast.error("please select size!", { autoClose: 1500 });
    //   return;
    // }
    const items = [...get().items];
    const index = items.findIndex((item) => item.productId === productId);

    if (index > -1) {
      items[index].Quantity += 1;
    } else {
      items.push({ productId, Quantity: 1 });
    }

    set({ items });
    setWithExpiry({ key: "cartItems", value: items, timeInHours: 8 });
    toast.success("item added", { autoClose: 1500 });
  },
  removeFromCart: (productId: string) => {
    let cartItems = [...get().items];
    cartItems = cartItems.filter((item) => !(item.productId === productId));
    set({ items: cartItems });
    setWithExpiry({ key: "cartItems", value: cartItems, timeInHours: 8 });
    toast.success("Item removed", { autoClose: 1500 });
  },
  incrementQuantity: (productId: string) => {
    const cartItems = [...get().items];
    const index = cartItems.findIndex((item) => item.productId === productId);

    if (index > -1) {
      cartItems[index].Quantity += 1;
      set({ items: cartItems });
      setWithExpiry({ key: "cartItems", value: cartItems, timeInHours: 8 });
    }
  },
  decrementQuantity: (productId: string) => {
    const cartItems = [...get().items];
    const index = cartItems.findIndex((item) => item.productId === productId);

    if (index > -1) {
      if (cartItems[index].Quantity > 1) {
        cartItems[index].Quantity -= 1;
      } else {
        cartItems.splice(index, 1);
      }
      set({ items: cartItems });
      setWithExpiry({ key: "cartItems", value: cartItems, timeInHours: 8 });
    }
  },
  getCartAmount: () => {
    let totalAmount = 0;
    const products = useProductsStore.getState().products;
    let cartItems = [...get().items];
    cartItems.forEach((item) => {
      const product = products.find(
        (singleProduct) => singleProduct._id === item.productId
      );
      if (!product) return;
      const price = product.price;
      totalAmount += price * item.Quantity;
    });
    return totalAmount;
  },
  getDiscountTotal: () => {
    let discountAmount = 0;
    const products = useProductsStore.getState().products;
    let cartItems = [...get().items];
    cartItems.forEach((item) => {
      console.log("cartItems", cartItems);
      const product = products.find(
        (singleProduct) => singleProduct._id === item.productId
      );
      if (!product) return;
      if (product.discountPrice > 0) {
        // discountAmount += product.price - product.discountPrice;
        const singleItemDiscount = product.price - product.discountPrice;
        discountAmount += singleItemDiscount * item.Quantity;
      }
      console.log("discountAmount", discountAmount);
    });
    return discountAmount;
  }
  // #end
}));
