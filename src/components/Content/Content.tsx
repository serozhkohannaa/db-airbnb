import React, { FC, useEffect, useState, Suspense } from 'react';
import './Content.scss';
import NavParams from "../NavParams/NavParams";
import NoContent from "../NoContent/NoContent";
import { getData, postData } from "../../services/request";
import { connect } from 'react-redux';
import { DEPLOY_URL } from "../../services/host";
import LoadMore from "../LoadMore/LoadMore";

import { getTypes, getCancellationPolicy, setLoader, setMaxPrice } from "../../action/actions";
import { FiltersInterface } from "../../constants/filters.interface";

import Filters from "../Filters/Filters";
import Loader from "../Loader/Loader";
import { ParamsInterfaces } from "../../constants/params.interfaces";

const ReviewItem = React.lazy(() => import("../ReviewItem/ReviewItem"));

interface Props {
  isOpen: boolean;
  getTypes: Function;
  getCancellationPolicy: Function;
  setLoader: Function;
  hasLoader: boolean;
  defaultParams: ParamsInterfaces,
  setMaxPrice: Function
}

const Content: FC<Props> = ({isOpen, getTypes, getCancellationPolicy, setLoader, hasLoader, defaultParams, setMaxPrice}) => {
  const [data, setData] = useState([]);
  const [priceRange, setPriceRange] = useState({min: 0, max: 10000});

  useEffect(() => {
	getData(DEPLOY_URL)
	  .then(data => {
		setData(data);
	  });
	getData(`${DEPLOY_URL}/sort/priceMin`)
	  .then(priceMin => setPriceRange(priceRange.min = priceMin));
	getData(`${DEPLOY_URL}/sort/priceMax`)
	  .then(priceMax => {
		setPriceRange({...priceRange, max: priceMax});
		setMaxPrice(priceMax);
	  });

	getTypes();
	getCancellationPolicy();
  }, [])

  const updateList = (type: string) => {
    const {price, property_type, cancellation_policy, isHighScored, sortPrice} = defaultParams;
	setLoader(true);

	getData(`${DEPLOY_URL}/filter/${price}&${property_type}&${cancellation_policy}&${isHighScored}&${sortPrice}`,)
	  .then(data => {
		setLoader(false);
		setData(data)
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

  const updateFilter = (params: FiltersInterface, sortPrice = defaultParams.sortPrice) => {
	const {price, property_type, cancellation_policy, isHighScored} = params || defaultParams;
	setLoader(true);

	getData(`${DEPLOY_URL}/filter/${price}&${property_type}&${cancellation_policy}&${isHighScored}&${1}`,)
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
	  return <Suspense fallback={<Loader/>}>
		{data.map((item: any, i) => {
		  return <ReviewItem getCommentAndDelete={setDelete} getNewComment={setCommentUpdate} key={i} review={item}/>
		})}
	  </Suspense>
	} else return <NoContent refreshSearch={refreshList}/>
  }

  const setMore = () => {
	setLoader(true);

	getData(`${DEPLOY_URL}/loadMore`,)
	  .then(data => {
		setLoader(false);
		setData(data)
	  });
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
	<div className="content-more">
	  <LoadMore loadMore={setMore}/>
	</div>
  </section>
}

const mapStateToProps = ({application, params}) => {
  return {
	isOpen: application.isOpen,
	hasLoader: application.hasLoader,
	defaultParams: params
  }
}

const mapDispatchToProps = {
  getTypes,
  getCancellationPolicy,
  setLoader,
  setMaxPrice
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);