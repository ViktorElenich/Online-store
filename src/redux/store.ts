import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  filter: filterReducer,
  cart: cartReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
