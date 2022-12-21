import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ICart } from '../../interfaces';
import { getLocalStorage, setLocalStorage } from '../../utils';

const initialState: ICart = {
  products: getLocalStorage('cartItems')
    ? JSON.parse(getLocalStorage('cartItems'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      const productIndex = state.products.filter(
        (item) => item.product.id === action.payload.id,
      );
      if (productIndex.length === 0) {
        const tempProduct = { product: action.payload, productQuantity: 1 };
        state.products.push(tempProduct);
        toast.success(`${action.payload.title} increased by one`, {
          position: 'top-left',
        });
      } else {
        productIndex[0].productQuantity += 1;
        state.cartTotalQuantity += 1;
      }
      setLocalStorage('cartItems', JSON.stringify(state.products));
    },
    calculateTotalQuantity: (state) => {
      const res: number[] = [];
      state.products.map((item) => {
        const { productQuantity } = item;
        return res.push(productQuantity);
      });
      const totalQuantity = res.reduce((a, b) => a + b, 0);
      state.cartTotalQuantity = totalQuantity;
    },
    calculatePrice: (state) => {
      const res: number[] = [];
      state.products.map((item) => {
        const { productQuantity } = item;
        const { price } = item.product;
        const amount = price * productQuantity;
        return res.push(amount);
      });
      const totalAmount = res.reduce((a, b) => a + b, 0);
      state.cartTotalAmount = totalAmount;
    },
    removeCartProduct: (state, action) => {
      const newCartItem = state.products.filter(
        (item) => item.product.id !== action.payload.id,
      );
      state.products = newCartItem;
      state.cartTotalQuantity -= newCartItem[0].productQuantity;
      state.cartTotalAmount -= (newCartItem[0].product.price * newCartItem[0].productQuantity);
      toast.success(`${action.payload.title} remove from cart`, {
        position: 'top-left',
      });
      setLocalStorage('cartItems', JSON.stringify(state.products));
    },
    decreaseCartProduct: (state, action) => {
      const productIndex = state.products.filter(
        (item) => item.product.id === action.payload.id,
      );
      if (productIndex[0].productQuantity > 1) {
        productIndex[0].productQuantity -= 1;
        toast.success(`${action.payload.title} decreased by one`, {
          position: 'top-left',
        });
      } else if (productIndex[0].productQuantity === 1) {
        const newCartItem = state.products.filter(
          (item) => item.product.id !== action.payload.id,
        );
        state.products = newCartItem;
        toast.success(`${action.payload.title} remove from cart`, {
          position: 'top-left',
        });
        setLocalStorage('cartItems', JSON.stringify(state.products));
      }
    },
  },
});

export const {
  setCartProducts,
  calculateTotalQuantity,
  calculatePrice,
  removeCartProduct,
  decreaseCartProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
