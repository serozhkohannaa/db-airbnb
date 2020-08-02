import React, { useEffect, useState } from 'react';
import './Content.scss';
import NavParams from "../NavParams/NavParams";
import ReviewItem from "../ReviewItem/ReviewItem";
import { getData } from "../../services/request";

const Content = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
	getData('http://localhost:5000/listingsAndReviews')
	  .then(data => setData(data));
  }, [])

  const renderData = () => {
    if (data.length > 0) {
	 return data.map((item: any, i) => {
	   return <ReviewItem key={i} review={item} />
	  })
	} else return <div>loading or absence of data</div>
  }

  return <section className='content'>
	<NavParams/>
	<div className="content-list">
	  {renderData()}
	</div>
  </section>
}

export default Content;