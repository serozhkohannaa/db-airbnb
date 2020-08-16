import React, { FC, useEffect, useState } from 'react';
import './Content.scss';
import NavParams from "../NavParams/NavParams";
import ReviewItem from "../ReviewItem/ReviewItem";
import NoContent from "../NoContent/NoContent";
import { getData, postData } from "../../services/request";
import { connect } from 'react-redux';
import { DEPLOY_URL } from "../../services/host";

import { getTypes, getCancellationPolicy, setLoader } from "../../action/actions";
import { FiltersInterface } from "../../constants/filters.interface";

import Filters from "../Filters/Filters";
import Loader from "../Loader/Loader";

interface Props {
  isOpen: boolean;
  getTypes: Function;
  getCancellationPolicy: Function;
  setLoader: Function;
  hasLoader: boolean
}

const Content: FC<Props> = ({isOpen, getTypes, getCancellationPolicy, setLoader, hasLoader}) => {
  const [data, setData] = useState([]);
  const [priceRange, setPriceRange] = useState({min: 0, max: 10000});

  useEffect(() => {
	getData(DEPLOY_URL)
	  .then(data => setData(data));
	getData(`${DEPLOY_URL}/sort/priceMin`)
	  .then(priceMin => setPriceRange(priceRange.min = priceMin));
	getData(`${DEPLOY_URL}/sort/priceMax`)
	  .then(priceMax => setPriceRange({...priceRange, max: priceMax}));

	getTypes();
	getCancellationPolicy();
  }, [])

  const updateList = (type: string) => {
	setLoader(true);
	getData(`${DEPLOY_URL}/sort/${type}`)
	  .then(data => {
		setLoader(false);
		setData(data);
	  });
  }

  const refreshList = () => {
	setLoader(true);

	getData(`${DEPLOY_URL}`)
	  .then(data => {
		setLoader(false);
		setData(data)
	  });
  }

  const searchRecord = (searchValue: string) => {
	setLoader(true);

	getData(`${DEPLOY_URL}/search/${searchValue}`)
	  .then(data => {
		setLoader(false);
		setData(data)
	  });
  }

  const updateFilter = (params: FiltersInterface) => {
	const {price, property_type, cancellation_policy, isHighScored} = params;
	setLoader(true);

	getData(`${DEPLOY_URL}/filter/${price}&${property_type}&${cancellation_policy}&${isHighScored}`,)
	  .then(data => {
		setLoader(false);
		setData(data)
	  });
  }

  const setCommentUpdate = (item) => {
	postData(`${DEPLOY_URL}/update/${item.listing_id}`, item)
	  .then(res => refreshList())
	  .catch(err => console.log(err, 'Can not perform update operation'))
  }

  const setDelete = (item) => {
	postData(`${DEPLOY_URL}/deleteComment/${item.listing_id}`, item)
	  .then(res => refreshList())
	  .catch(err => console.log(err, 'Can not perform delete operation'))
  }

  const renderData = () => {
	if (data?.length > 0) {
	  return data.map((item: any, i) => {
		return <ReviewItem getCommentAndDelete={setDelete} getNewComment={setCommentUpdate} key={i} review={item}/>
	  })
	} else return <NoContent refreshSearch={refreshList} />
  }


  return <section className='content'>
	<NavParams total={data?.length} setUpdate={updateList} setSearchRecord={searchRecord} setRefresh={refreshList}/>
	<div className={`filters-wrapper ${isOpen && 'is-open'}`}>
	  <Filters priceRange={priceRange} setFilter={updateFilter}/>
	</div>
	<div className="content-list">
	  {renderData()}
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
  setLoader
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);