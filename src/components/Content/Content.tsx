import React, { useEffect, useState } from 'react';
import './Content.scss';
import NavParams from "../NavParams/NavParams";
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
	   return <div key={i}>
		 <p>{item.name}</p>
		</div>
	  })
	} else return <div>loading or absence</div>
  }

  return <section className='content'>
	<NavParams/>
	<div className="content-list">
	  {renderData()}
	</div>
  </section>
}

export default Content;