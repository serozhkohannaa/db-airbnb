import React, { FC } from 'react';
import './Review.scss';
import UserIcon from '../../assets/img/user.svg';
import DeleteIcon from '../../assets/img/delete.svg';
import moment from "moment";

import { CommentInterface } from "../../constants/comment.interface";

interface Props {
  review: CommentInterface;
  getReviewToDelete: Function
}

const Review: FC<Props> = ({review, getReviewToDelete}) => {
  const {reviewer_name, date, comments, reviewer_id} = review;
  const dateFormatted = moment(date).format('LL');

  return <div className='review-item'>
	<div className="review-item-header">
	  <div className="img-wrapper">
		<img src={UserIcon} alt="user-pic"/>
	  </div>
	  <div className="comment-info">
		<div className="title" data-testid='user-name'>
		  {reviewer_name}
		</div>
		<div className="subtitle" data-testid='user-date'>
		  {dateFormatted}
		</div>
	  </div>
	</div>
	<div className="review-item-body">
	  <div className="comment-text">
		<p data-testid='user-comments'>{comments}</p>
	  </div>
	</div>
	{reviewer_id === '1001' && <button className="btn delete-btn" onClick={() => getReviewToDelete(review)}>
			<img src={DeleteIcon} alt="delete-basket"/>
	</button>}
  </div>
}

export default Review;