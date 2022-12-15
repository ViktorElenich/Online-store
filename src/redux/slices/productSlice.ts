import { createSlice } from "@reduxjs/toolkit";
import {IProductData} from "../../interfaces/IProductData";

interface IState {
  products: IProductData[]
}

const initialState: IState = {
  products: [],
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setStoreProducts: (state, action) => {
      state.products = action.payload.products;
    },
  }
})

export const { setStoreProducts } = productSlice.actions;

export default productSlice.reducer;