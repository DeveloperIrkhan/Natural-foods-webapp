import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/interfaces/product.interface";
import { RootState } from "@/store/store";
const initialState = {
  products: [] as IProduct[]
};

export const productSlice = createSlice({
  name: "product-slice",
  initialState,
  reducers: {
    setProductArray: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    }
  }
});

export const selectProductList  = (state: RootState) => state.productSlice.products;
export const { setProductArray } = productSlice.actions;
export default productSlice.reducer;
