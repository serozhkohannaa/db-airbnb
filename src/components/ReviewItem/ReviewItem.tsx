import React, { FC } from 'react';
import './ReviewItem.scss';

import BedIcon from '../../assets/img/bed.svg';
import RoomIcon from '../../assets/img/room.svg';
import GuestIcon from '../../assets/img/guest.svg';
import NightIcon from '../../assets/img/night.svg';
import AccurateIcon from '../../assets/img/accurate.svg';
import CleanIcon from '../../assets/img/clean.svg';
import ChatIcon from '../../assets/img/chat.svg';
import LocationIcon from '../../assets/img/location.svg';

import PriceBlock from "../PriceBlock/PriceBlock";
import ReviewScore from "../ReviewScore/ReviewScore";

import { ScoreInterface } from "../../pages/score.interface";

interface Props {
  review: any
}

const ReviewItem: FC<Props> = ({review}) => {
  let reviewScore: [ScoreInterface] = [
	{
	  type: '',
	  icon: '',
	  value: 0
	}
  ];

  // console.log(review.review_scores);

  if (review.review_scores) {

	const {review_scores_accuracy, review_scores_cleanliness, review_scores_communication, review_scores_location} = review?.review_scores;
	//@ts-ignore
	reviewScore = [
	  {
		type: 'Accurate',
		icon: AccurateIcon,
		value: review_scores_accuracy
	  },
	  {
		type: 'Clean',
		icon: CleanIcon,
		value: review_scores_cleanliness
	  },
	  {
		type: 'Communication',
		icon: ChatIcon,
		value: review_scores_communication
	  },
	  {
		type: 'Location',
		icon: LocationIcon,
		value: review_scores_location
	  }
	]
  }

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
		<div className="type">
		  <button className="button primary is-small">
			{review.property_type}
		  </button>
		</div>
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
			<div className="desc-item">
			  <div className="subtitle">
				<p>Summary</p>
			  </div>
			  <div className="desc-text">
				{review.summary}
			  </div>
			</div>
			<div className="desc-item">
			  <div className="subtitle">
				<p>Location</p>
			  </div>
			  <div className="desc-text">
				{review.address.street}
			  </div>
			</div>
		  </div>
		  <PriceBlock price={review.price} deposit={review.security_deposit} fee={review.cleaning_fee}/>
		</div>
	  </div>
	</div>
	<div className="review-bottom">
	  <ReviewScore scores={reviewScore}/>
	  <div className="user-review">
		<div className="user-review-header">
		  header
		</div>
	  </div>
	</div>
  </div>
}

export default ReviewItem;