import { createSlice } from '@reduxjs/toolkit';
import { IStateProducts } from '../../interfaces/index';

const initialState: IStateProducts = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setStoreProducts: (state, action) => {
      state.products = action.payload.products;
    },
  },
});

export const { setStoreProducts } = productSlice.actions;

export default productSlice.reducer;
