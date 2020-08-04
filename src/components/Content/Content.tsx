import React, { FC, useEffect, useState } from 'react';
import './Content.scss';
import NavParams from "../NavParams/NavParams";
import ReviewItem from "../ReviewItem/ReviewItem";
import { getData } from "../../services/request";
import { connect } from 'react-redux'

import Filters from "../Filters/Filters";

interface Props {
  isOpen: boolean;
}

const Content: FC<Props> = ({isOpen}) => {
  const [data, setData] = useState([]);

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
  }

  const searchRecord = (searchValue: string) => {
	getData(`http://localhost:5000/listingsAndReviews/search/${searchValue}`)
	  .then(data => setData(data));
  }

  const updateFilter = (searchValue: string) => {
	getData(`http://localhost:5000/listingsAndReviews/filter/${searchValue}`)
	  .then(data => setData(data));
  }

  const renderData = () => {
	if (data.length > 0) {
	  return data.map((item: any, i) => {
		return <ReviewItem key={i} review={item}/>
	  })
	} else return <div>loading or absence of data</div>
  }

  return <section className='content'>
	<NavParams setUpdate={updateList} setSearchRecord={searchRecord} setRefresh={refreshList} amount={data.length}/>
	<div className={`filters-wrapper ${isOpen && 'is-open'}`}>
	  <Filters setFilter={updateFilter}/>
	</div>
	<div className="content-list">
	  {renderData()}
	</div>
  </section>
}

const mapStateToProps = ({application}) => {
  return {
    isOpen: application.isOpen
  }
}

export default connect(mapStateToProps)(Content);