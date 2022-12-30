import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import store from "../redux/store";
import ProductInfo from "../components/ProductItemInformation/ProductInfo/ProductInfo";

const product = [{
  "price": 549,
  "title": "iPhone 9",
  "category": "smartphones",
  "brand": "Apple",
  "stock": 94,
  "description": "An apple mobile which is nothing like apple",
  "discountPercentage": 12.96,
  "images": [
    "https://i.dummyjson.com/data/products/1/1.jpg",
    "https://i.dummyjson.com/data/products/1/2.jpg",
    "https://i.dummyjson.com/data/products/1/3.jpg",
    "https://i.dummyjson.com/data/products/1/4.jpg",
    "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
  ],
  "rating": 4.69,
  "id": 1,
  "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
}]

describe('Cards', () => {
  it('render 1 card', async () => {
    const history = createMemoryHistory;
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter history={history}>
            <ProductInfo product={product}/>
          </BrowserRouter>
        </Provider>
      );
    });
    const cards = await screen.findAllByTestId('item');
    expect(cards.length).toBe(1);
  });
});