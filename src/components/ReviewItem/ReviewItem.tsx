import React, { FC } from 'react';
import './ReviewItem.scss';

import BedIcon from '../../assets/img/bed.svg';
import RoomIcon from '../../assets/img/room.svg';
import GuestIcon from '../../assets/img/guest.svg';
import NightIcon from '../../assets/img/night.svg';

interface Props {
  review: any
}

const ReviewItem: FC<Props> = ({review}) => {
  console.log(review.images);
  return <div className='review'>
	<div className="review-top">
	  <div className="img-wrapper">
		<img src={review.images[0].picture_url} alt="flat-img"/>
		<div className="buttons-holder">
		  <button className="button is-small secondary">
			{review.property_type}
		  </button>
		  <button className="button is-small primary">
			<span>min</span> {review.minimum_nights}
		  </button>
		</div>
		{review.review_scores?.review_scores_value &&
				<div className="score-label">
					<p>HIGH SCORED</p>
				</div>}
	  </div>
	  <div className="info-wrapper">
		<div className="title">
		  <h3>{review.name}</h3>
		</div>
		<ul className="params-list">
		  <li className='param-item'>
			<img src={RoomIcon} alt="room-icon"/>
			<p>{review.beds} beds</p>
		  </li>
		  <li className='param-item'>
			<img src={RoomIcon} alt="room-icon"/>
			<p>{review.bedrooms} rooms</p>
		  </li>
		  <li className='param-item'>
			<img src={GuestIcon} alt="guests-icon"/>
			<p>{review.guests_included} guests</p>
		  </li>
		  <li className='param-item'>
			<img src={NightIcon} alt="night-icon"/>
			<p>up to {review.maximum_nights} nights</p>
		  </li>
		</ul>
		<div className="content-body">
		  <div className="description-block">
			<div className="policy-text">
			  Cancelation policy: <span>{review.cancellation_policy}</span>
			</div>
		  </div>
		  <div className="price-block">
			price
		  </div>
		</div>
	  </div>
	</div>
	<div className="review-bottom">

	</div>
  </div>
}

export default ReviewItem;