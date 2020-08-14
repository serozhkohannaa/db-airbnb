import React, { FC, useEffect, useState } from 'react';
import './Content.scss';
import NavParams from "../NavParams/NavParams";
import ReviewItem from "../ReviewItem/ReviewItem";
import LoadMore from "../LoadMore/LoadMore";
import { getData, postData } from "../../services/request";
import { connect } from 'react-redux';

import { getTypes, getCancellationPolicy, getAmount, setLoader } from "../../action/actions";
import { FiltersInterface } from "../../constants/filters.interface";

import Filters from "../Filters/Filters";
import Loader from "../Loader/Loader";

interface Props {
  isOpen: boolean;
  getTypes: Function;
  getCancellationPolicy: Function;
  getAmount: Function;
  setLoader: Function;
  hasLoader: boolean
}

const Content: FC<Props> = ({isOpen, getTypes, getCancellationPolicy, getAmount, setLoader, hasLoader}) => {
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
	getAmount();
  }, [])

  const updateList = (type: string) => {
	setLoader(true);
	getData(`http://localhost:5000/listingsAndReviews/sort/${type}`)
	  .then(data => {
		setLoader(false);
		setData(data);
	  });
  }

  const refreshList = () => {
	setLoader(true);

	getData('http://localhost:5000/listingsAndReviews')
	  .then(data => {
		setLoader(false);
		setData(data)
	  });
  }

  const searchRecord = (searchValue: string) => {
	getData(`http://localhost:5000/listingsAndReviews/search/${searchValue}`)
	  .then(data => setData(data));
  }

  const updateFilter = (params: FiltersInterface) => {
	const {price, property_type, cancellation_policy, isHighScored} = params;
	setLoader(true);

	getData(`http://localhost:5000/listingsAndReviews/filter/${price}&${property_type}&${cancellation_policy}&${isHighScored}`,)
	  .then(data => {
		setLoader(false);
		setData(data)
	  });
  }

  const setCommentUpdate = (item) => {
	postData(`http://localhost:5000/listingsandreviews/update/${item.listing_id}`, item)
	  .then(res => refreshList())
	  .catch(err => console.log(err, 'Can not perform update operation'))
  }

  const setDelete = (item) => {
	postData(`http://localhost:5000/listingsandreviews/deleteComment/${item.listing_id}`, item)
	  .then(res => refreshList())
	  .catch(err => console.log(err, 'Can not perform update operation'))
  }

  const renderData = () => {
	if (data?.length > 0) {
	  return data.map((item: any, i) => {
		return <ReviewItem getCommentAndDelete={setDelete} getNewComment={setCommentUpdate} key={i} review={item}/>
	  })
	} else return <div>loading or absence of data</div>
  }

  const setMore = () => {
	setLoader(true);
	getData(`http://localhost:5000/listingsAndReviews/loadMore`,)
	  .then(data => {
		setLoader(false);
		refreshList()
	  });
  }

  return <section className='content'>
	<NavParams setUpdate={updateList} setSearchRecord={searchRecord} setRefresh={refreshList}/>
	<div className={`filters-wrapper ${isOpen && 'is-open'}`}>
	  <Filters priceRange={priceRange} setFilter={updateFilter}/>
	</div>
	<div className="content-list">
	  {renderData()}
	</div>
	<div className="content-more">
	  <LoadMore loadMore={setMore} loadedAmount={data?.length}/>
	</div>
	{hasLoader && <div className='loader-wrapper'><Loader/></div>}
  </section>
}

const mapStateToProps = ({application}) => {
  return {
	isOpen: application.isOpen,
	hasLoader: application.hasLoader
  }
}

const mapDispatchToProps = {
  getTypes,
  getCancellationPolicy,
  getAmount,
  setLoader
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);