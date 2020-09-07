import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Review from "./Review";

it('renders correct text', () => {
  const review = {
	reviewer_name: 'userName',
	date: 'September 7, 2020',
	comments: 'comment',
	reviewer_id: '5',
	_id: 0,
	listing_id: '1'
  }

  const { getByTestId } = render(<Review review={review}/>);
  expect(getByTestId('user-name')).toHaveTextContent(review.reviewer_name)
  expect(getByTestId('user-comments')).toHaveTextContent(review.comments)
  expect(getByTestId('user-date')).toHaveTextContent(review.date)
})