import { render, screen } from '@testing-library/react';
import ProductInfo from '../components/ProductItemInformation/ProductInfo/ProductInfo';
import store from '../redux/store';
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import {createMemoryHistory} from "history";
import '@testing-library/jest-dom';

const product = [
  {
    price: 549,
    title: 'iPhone 9',
    category: 'smartphones',
    brand: 'Apple',
    stock: 94,
    description: 'An apple mobile which is nothing like apple',
    discountPercentage: 12.96,
    images: [
      'https://i.dummyjson.com/data/products/1/1.jpg',
      'https://i.dummyjson.com/data/products/1/2.jpg',
      'https://i.dummyjson.com/data/products/1/3.jpg',
      'https://i.dummyjson.com/data/products/1/4.jpg',
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    ],
    rating: 4.69,
    id: 1,
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  },
];

describe('Card', () => {
  it('renders all card content', () => {
    const history = createMemoryHistory;
    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <ProductInfo product={product} />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.findAllByText(/iPhone 9/i));
    expect(screen.getByText(/94/i)).toBeInTheDocument();
    expect(screen.getByText(/549/i)).toBeInTheDocument();
    expect(screen.findAllByText(/smartphones/i));
  });
});
