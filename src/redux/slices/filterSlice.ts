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
      const {
        products,
        search,
        sort,
        brands,
        categories,
        minStock,
        maxStock,
        minPrice,
        maxPrice,
      } = action.payload;
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
      tempProducts = tempProducts.filter((product: IProductData) =>
        brands.includes(product.brand),
      );
      tempProducts = tempProducts.filter((product: IProductData) =>
        categories.includes(product.category),
      );
      tempProducts = tempProducts.filter(
        (product: IProductData) =>
          product.stock >= minStock && product.stock <= maxStock,
      );
      tempProducts = tempProducts.filter(
        (product: IProductData) =>
          product.price >= minPrice && product.price <= maxPrice,
      );

      state.filterProducts = tempProducts;
    },
  },
});

export const { filtersProducts } = filterSlice.actions;

export default filterSlice.reducer;
