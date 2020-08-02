import React, { FC } from 'react';
import './Review.scss';
import UserIcon from '../../assets/img/user.svg';

import { CommentInterface } from "../../constants/comment.interface";

interface Props {
  review: CommentInterface;
}

const Review: FC<Props> = ({review}) => {
  const {reviewer_name, date, comments} = review;

  return <div className='review-item'>
	<div className="review-item-header">
	  <div className="img-wrapper">
		<img src={UserIcon} alt="user-pic"/>
	  </div>
	  <div className="comment-info">
		<div className="title">
		  {reviewer_name}
		</div>
		<div className="subtitle">
		  {date}
		</div>
	  </div>
	</div>
	<div className="review-item-body">
	  <div className="comment-text">
		<p>{comments}</p>
	  </div>
	</div>
  </div>
}

export default Review;