import React from 'react'
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Hero from "./Hero";
import TestRenderer from 'react-test-renderer';

it('renders headline', () => {
  const section = document.createElement("section");
  ReactDOM.render(<Hero heroText='Airbnb listenings and reviews'/>, section)
})

it('renders correct text', () => {
  const { getByTestId } = render(<Hero heroText='simple text'/>);
  expect(getByTestId('hero-text')).toHaveTextContent('simple text')
})

it(('matches snapshot'), () => {
  const tree = TestRenderer.create(<Hero heroText='Airbnb listenings and reviews'/>).toJSON();
  expect(tree).toMatchSnapshot();
})