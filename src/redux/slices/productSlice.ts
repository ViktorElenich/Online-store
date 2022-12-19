import { createSlice } from '@reduxjs/toolkit';
import { IStateProducts } from '../../interfaces/index';

const initialState: IStateProducts = {
  products: [],
  product: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setStoreProducts: (state, action) => {
      state.products = action.payload.products;
    },
    setStoreProduct: (state, action) => {
      state.product = action.payload.product;
    },
  },
});

export const { setStoreProducts, setStoreProduct } = productSlice.actions;

export default productSlice.reducer;
