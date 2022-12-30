import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import ProductsContainer from '../components/ProductsContainer/ProductsContainer';

describe('ProductsContainer', () => {
  it('render products container', async () => {
    const history = createMemoryHistory;
    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <ProductsContainer />
        </BrowserRouter>
      </Provider>,
    );
    expect(
      await waitFor(() => screen.getByTestId('container-products')),
    ).toBeInTheDocument();
  });
});
