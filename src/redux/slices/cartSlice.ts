import { createSlice } from '@reduxjs/toolkit';
import { ICart } from '../../interfaces';

const initialState: ICart = {
  products: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      console.log(action.payload)
      const productIndex = state.products.findIndex(
        (item) => item.product.id === action.payload.id,
      );
      if (productIndex >= 0) {
        state.products[productIndex].productQuantity += 1;
        state.cartTotalQuantity += 1;
      } else {
        const tempProduct = {...action.payload, productQuantity: 1}
        state.products.push(tempProduct)
      }
    },
  },
});

export const { setCartProducts } = cartSlice.actions;
export default cartSlice.reducer;
