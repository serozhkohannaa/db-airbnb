import React, { FC } from 'react';
import './ReviewScore.scss';

import { ScoreInterface } from "../../pages/score.interface";

interface Props {
  scores: [ScoreInterface];
}

const ReviewScore: FC<Props> = ({scores}) => {
  return <div className='reviewScore'>
	<div className="title">
	  <p>Review scores</p>
	</div>
	<div className="review-content">
	  {scores.length > 1 ? scores.map((item, i) => {
		return <div key={i} className='score-item'>
		  <div className="icon-wrapper">
			<img src={item.icon} alt="score-icon"/>
		  </div>
		  <div className="score-text">
			<p>{item.type}:</p> <span>{item.value}</span>
		  </div>
		</div>
	  }) : <p>no reviews provided</p>}
	</div>
  </div>
}

export default ReviewScore;