import { createSlice } from '@reduxjs/toolkit';
import {IProductData, IStateFilter } from '../../interfaces';

const initialState: IStateFilter = {
  filterProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterSearch: (state, action) => {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product: IProductData) =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase()) ||
          product.price
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase()) ||
          product.stock.toString().toLowerCase().includes(search.toLowerCase()),
      );

      state.filterProducts = tempProducts;
    },
  },
});

export const { filterSearch } = filterSlice.actions;

export default filterSlice.reducer;
