import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorPage from "../pages/ErrorPage/ErrorPage";

describe('PageNotFound', () => {
  it('render PageNotFound component', () => {
    render(<ErrorPage />);
    expect(screen.getByText('Error: 404 page not found')).toBeInTheDocument();
  });
});