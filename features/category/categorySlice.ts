import { ICategory } from "@/interfaces/product.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  categories: [] as ICategory[] // not null
};

export const categorySlice = createSlice({
  name: "category-slice",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    }
  }
});

// export const category = (state: any) => state.categorySlice.categories;

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
