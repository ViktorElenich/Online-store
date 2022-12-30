import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import App from '../App';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from "../redux/store";

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent,
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe('App', () => {
  it('renders home page', async () => {
    const history = createMemoryHistory;
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter history={history}>
            <App />
          </BrowserRouter>
        </Provider>
      );
    });
    expect(screen.getByTestId('App')).toBeInTheDocument();
  });

  it('renders about us page after click about us button', async () => {
    const history = createMemoryHistory;
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter history={history}>
            <App />
          </BrowserRouter>
        </Provider>
      );
    });
    const user = userEvent;
    expect(screen.getByTestId('container-products')).toBeInTheDocument();
    await user.click(screen.getByText(/About Us/i));
    expect(screen.getByTestId('about__page')).toBeInTheDocument();
  });

  it('renders page not found if use wrong path', () => {
    const history = createMemoryHistory;
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: '/something-that-does-not-match' });
    expect(screen.getByText(/Error: 404 page not found/i)).toBeInTheDocument();
  });
});