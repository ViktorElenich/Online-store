import { createSlice } from '@reduxjs/toolkit';
import { IProductData, IStateFilter } from '../../interfaces';

const initialState: IStateFilter = {
  filterProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filtersProducts: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { products, search, sort, brands, categories } = action.payload;
      let tempProducts = products;
      tempProducts = tempProducts.filter(
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
      if (sort === 'lowest-price') {
        tempProducts.sort(
          (a: { price: number }, b: { price: number }) => a.price - b.price,
        );
      }
      if (sort === 'highest-price') {
        tempProducts.sort(
          (a: { price: number }, b: { price: number }) => b.price - a.price,
        );
      }
      if (sort === 'lowest-rating') {
        tempProducts.sort(
          (a: { rating: number }, b: { rating: number }) => a.rating - b.rating,
        );
      }
      if (sort === 'highest-rating') {
        tempProducts.sort(
          (a: { rating: number }, b: { rating: number }) => b.rating - a.rating,
        );
      }
      if (sort === 'lowest-discount') {
        tempProducts.sort(
          (
            a: { discountPercentage: number },
            b: { discountPercentage: number },
          ) => a.discountPercentage - b.discountPercentage,
        );
      }
      if (sort === 'highest-discount') {
        tempProducts.sort(
          (
            a: { discountPercentage: number },
            b: { discountPercentage: number },
          ) => b.discountPercentage - a.discountPercentage,
        );
      }
      if (brands.length > 0) {
        tempProducts = tempProducts.filter((x: IProductData) => brands.includes(x.brand))
      }

      tempProducts = tempProducts.filter((x: IProductData) => categories.includes(x.category))


      state.filterProducts = tempProducts;
    },
  },
});

export const { filtersProducts } = filterSlice.actions;

export default filterSlice.reducer;
