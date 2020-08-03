import React, { useEffect, useState } from 'react';
import './Content.scss';
import NavParams from "../NavParams/NavParams";
import ReviewItem from "../ReviewItem/ReviewItem";
import { getData } from "../../services/request";

const Content = () => {
  const [data, setData] = useState([]);
  const [isRefresh, setRefresh] = useState();

  useEffect(() => {
	getData('http://localhost:5000/listingsAndReviews')
	  .then(data => setData(data));
  }, [])

  const updateList = (type: string) => {
	getData(`http://localhost:5000/listingsAndReviews/sort/${type}`)
	  .then(data => setData(data));
  }

  const refreshList = () => {
	getData('http://localhost:5000/listingsAndReviews')
	  .then(data => setData(data));

	setRefresh(true);
  }

  const renderData = () => {
	if (data.length > 0) {
	  return data.map((item: any, i) => {
		return <ReviewItem key={i} review={item}/>
	  })
	} else return <div>loading or absence of data</div>
  }

  return <section className='content'>
	<NavParams setUpdate={updateList} setRefresh={refreshList} amount={data.length}/>
	<div className="content-list">
	  {renderData()}
	</div>
  </section>
}

export default Content;