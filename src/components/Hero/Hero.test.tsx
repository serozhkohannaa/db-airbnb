import React from 'react'
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Hero from "./Hero";

afterEach(cleanup);

it('renders headline', () => {
  const section = document.createElement("section");
  ReactDOM.render(<Hero heroText='Airbnb listenings and reviews'/>, section)
})

it('renders correct text', () => {
  const { getByTestId } = render(<Hero heroText='simple text'/>);
  expect(getByTestId('hero-text')).toHaveTextContent('simple text')
})
