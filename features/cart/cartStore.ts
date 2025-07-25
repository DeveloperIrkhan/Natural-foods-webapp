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
  shippingcharges: number;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  hydrateCartFromStorage: () => void;
  getCartAmount: () => void;
  getDiscountTotal: () => void;
  isHydrated: boolean;
  totalAmountAfter: number;
  resetCart: () => void;
  settotalAmountAfter: (totalAmountAfter: number) => void;
  getCurrentItemCount: (productId: string) => number;
}

export const useCartStore = create<ICartStore>((set, get) => ({
  // getting items from local storage for the firsttime
  isHydrated: false,
  shippingcharges: 0,
  totalAmountAfter: 0,
  settotalAmountAfter: (amount) => {
    set({ totalAmountAfter: amount });
  },
  getCurrentItemCount: (productId: string) => {
    const cart = get().items;
    const item = cart.find((item) => item.productId === productId);
    return item ? item.Quantity : 0;
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
  addToCart: (productId) => {
    const items = [...get().items];
    const index = items.findIndex((item) => item.productId === productId);

    if (index > -1) {
      items[index].Quantity += 1;
    } else {
      items.push({ productId, Quantity: 1 });
    }

    set({ items });
    const product = useProductsStore.getState().products;
    const productName = product.find((item) => item._id === productId);
    setWithExpiry({ key: "cartItems", value: items, timeInHours: 8 });
    toast.success(
      `${
        productName ? `${productName.name} added to cart` : "item added to cart"
      }`,
      { autoClose: 1500 }
    );
  },
  removeFromCart: (productId: string) => {
    let cartItems = [...get().items];
    cartItems = cartItems.filter((item) => !(item.productId === productId));
    set({ items: cartItems });
    setWithExpiry({ key: "cartItems", value: cartItems, timeInHours: 8 });
    toast.warning("Item removed from cart", { autoClose: 1500 });
  },
  incrementQuantity: (productId: string) => {
    const cartItems = [...get().items];
    const index = cartItems.findIndex((item) => item.productId === productId);
    const currentItemQuantity = get().getCurrentItemCount(productId);
    const products = useProductsStore.getState().products;
    const product = products.find((item) => item._id === productId);
    if (!product) return;

    if (currentItemQuantity >= product.inStock) {
      toast.error("Sorry, we are out of stock", { autoClose: 1500 });
      return;
    }

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
      // console.log("cartItems", cartItems);
      const product = products.find(
        (singleProduct) => singleProduct._id === item.productId
      );
      if (!product) return;
      if (product.discountPrice > 0) {
        // discountAmount += product.price - product.discountPrice;
        const singleItemDiscount = product.price - product.discountPrice;
        discountAmount += singleItemDiscount * item.Quantity;
      }
      // console.log("discountAmount", discountAmount);
    });
    return discountAmount;
  },
  resetCart: () => {
    set({ items: [] });
    localStorage.removeItem("cartItems");
  }
}));
