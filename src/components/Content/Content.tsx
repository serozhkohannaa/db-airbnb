import React, { FC, useEffect, useState } from 'react';
import './Content.scss';
import NavParams from "../NavParams/NavParams";
import ReviewItem from "../ReviewItem/ReviewItem";
import { getData } from "../../services/request";
import { connect } from 'react-redux';

import { getTypes, getCancellationPolicy } from "../../action/actions";

import Filters from "../Filters/Filters";

interface Props {
  isOpen: boolean;
  getTypes: Function;
  getCancellationPolicy: Function;
}

const Content: FC<Props> = ({isOpen, getTypes, getCancellationPolicy}) => {
  const [data, setData] = useState([]);
  const [priceRange, setPriceRange] = useState({min: 0, max: 10000});

  useEffect(() => {
	getData('http://localhost:5000/listingsAndReviews')
	  .then(data => setData(data));
	getData('http://localhost:5000/listingsAndReviews/sort/priceMin')
	  .then(priceMin => setPriceRange(priceRange.min = priceMin));
	getData('http://localhost:5000/listingsAndReviews/sort/priceMax')
	  .then(priceMax => setPriceRange({...priceRange, max: priceMax}));

	getTypes();
	getCancellationPolicy();
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

  const updateFilter = (params) => {
	const {price, property_type, cancellation_policy} = params;

	getData(`http://localhost:5000/listingsAndReviews/filter/${price}&${property_type}&${cancellation_policy}`,)
	  .then(data => setData(data));
  }

  const renderData = () => {
	if (data?.length > 0) {
	  return data.map((item: any, i) => {
		return <ReviewItem key={i} review={item}/>
	  })
	} else return <div>loading or absence of data</div>
  }

  return <section className='content'>
	<NavParams setUpdate={updateList} setSearchRecord={searchRecord} setRefresh={refreshList} amount={data?.length}/>
	<div className={`filters-wrapper ${isOpen && 'is-open'}`}>
	  <Filters priceRange={priceRange} setFilter={updateFilter}/>
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

const mapDispatchToProps = {
  getTypes,
  getCancellationPolicy
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);