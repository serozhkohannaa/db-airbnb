import React, { FC, useState } from 'react';
import './SortParams.scss';

import { setSortParam } from "../../action/actions";
import { connect } from "react-redux";

interface Props {
  setSort: Function;
  sortPrice: number;
  setSortParam: Function;
}

const SortParams: FC<Props> = ({setSort, setSortParam, sortPrice}) => {
  const [activeParam, setActive] = useState(false);

  const handleSort = (type: string) => {
	setActive(!activeParam);
	setSort(type);

	sortPrice === 1 ? setSortParam(-1) : setSortParam(1);
  }

  return <div className='sortParams'>
	{/*<div className={`sort-item ${activeParam && 'is-active'}`} onClick={() => handleSort('reviews')}>*/}
	{/*  <div className="sort-item-icon">*/}
	{/*	<svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
	{/*	  <path*/}
	{/*		d="M3.97161 1.89653L2.3751 0.146529C2.1972 -0.048721 1.908 -0.048721 1.73011 0.146529L0.133594 1.89653C-0.0445313 2.09178 -0.0445313 2.40828 0.133594 2.60353C0.311491 2.79878 0.600688 2.79878 0.778585 2.60353L1.59646 1.70703V11.5C1.59646 11.776 1.80081 12 2.0526 12C2.3044 12 2.50875 11.776 2.50875 11.5V1.70703L3.32662 2.60353C3.41557 2.70128 3.53234 2.75003 3.64912 2.75003C3.76589 2.75003 3.88266 2.70128 3.97161 2.60353C4.14974 2.40828 4.14974 2.09178 3.97161 1.89653V1.89653Z"*/}
	{/*		fill="#2B2A5E"/>*/}
	{/*	  <path*/}
	{/*		d="M8.07693 9.3965C7.8988 9.20125 7.61006 9.20125 7.43194 9.3965L6.61407 10.293V0.5C6.61407 0.224 6.40971 0 6.15792 0C5.90613 0 5.70177 0.224 5.70177 0.5V10.293L4.8839 9.3965C4.70578 9.20125 4.41681 9.20125 4.23891 9.3965C4.06078 9.59175 4.06078 9.90825 4.23891 10.1035L5.83542 11.8535C5.9246 11.9513 6.04115 12 6.15792 12C6.27469 12 6.39124 11.9513 6.48042 11.8535L8.07693 10.1035C8.25505 9.90825 8.25505 9.59175 8.07693 9.3965Z"*/}
	{/*		fill="#2B2A5E"/>*/}
	{/*	</svg>*/}
	{/*  </div>*/}
	{/*  <div className="sort-item-text">*/}
	{/*	<p>Reviews</p>*/}
	{/*  </div>*/}
	{/*</div>*/}

	<div className={`sort-item ${activeParam && 'is-active'}`} onClick={() => handleSort('price')}>
	  <div className="sort-item-icon">
		<svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		  <path
			d="M3.97161 1.89653L2.3751 0.146529C2.1972 -0.048721 1.908 -0.048721 1.73011 0.146529L0.133594 1.89653C-0.0445313 2.09178 -0.0445313 2.40828 0.133594 2.60353C0.311491 2.79878 0.600688 2.79878 0.778585 2.60353L1.59646 1.70703V11.5C1.59646 11.776 1.80081 12 2.0526 12C2.3044 12 2.50875 11.776 2.50875 11.5V1.70703L3.32662 2.60353C3.41557 2.70128 3.53234 2.75003 3.64912 2.75003C3.76589 2.75003 3.88266 2.70128 3.97161 2.60353C4.14974 2.40828 4.14974 2.09178 3.97161 1.89653V1.89653Z"
			fill="#2B2A5E"/>
		  <path
			d="M8.07693 9.3965C7.8988 9.20125 7.61006 9.20125 7.43194 9.3965L6.61407 10.293V0.5C6.61407 0.224 6.40971 0 6.15792 0C5.90613 0 5.70177 0.224 5.70177 0.5V10.293L4.8839 9.3965C4.70578 9.20125 4.41681 9.20125 4.23891 9.3965C4.06078 9.59175 4.06078 9.90825 4.23891 10.1035L5.83542 11.8535C5.9246 11.9513 6.04115 12 6.15792 12C6.27469 12 6.39124 11.9513 6.48042 11.8535L8.07693 10.1035C8.25505 9.90825 8.25505 9.59175 8.07693 9.3965Z"
			fill="#2B2A5E"/>
		</svg>
	  </div>
	  <div className="sort-item-text">
		<p>Daily price</p>
	  </div>
	</div>
  </div>
}

const mapStateToProps = ({params}) => {
  return {
	sortPrice: params.sortPrice
  }
}

const mapDispatchToProps = {
  setSortParam
}

export default connect(mapStateToProps, mapDispatchToProps)(SortParams);