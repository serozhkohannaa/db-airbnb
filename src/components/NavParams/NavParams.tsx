import React, { FC } from "react";
import './NavParams.scss';
import RefreshIcon from '../../assets/img/refresh.svg';
import SortParams from "../SortParams/SortParams";
import Input from "../Input/Input";

import { setFiltersOpen } from "../../action/actions";
import { connect } from 'react-redux'

interface Props {
  amount: number;
  setUpdate: any;
  setRefresh: any;
  setSearchRecord: any;
  isOpen: boolean;
  setFiltersOpen: any;
}

const NavParams: FC<Props> = ({amount, setUpdate, setRefresh, setSearchRecord, isOpen, setFiltersOpen}) => {
  const setType = (type: string) => {
	setUpdate(type);
  }

  const handleRefresh = () => {
	setRefresh();
  }

  const setSearch = (value: string) => {
	setSearchRecord(value);
  }

  const handleOpen = () => {
	setFiltersOpen(!isOpen);
  }

  return <div className='navParams'>
	<button className="button secondary is-medium amount">
	  {amount} items
	</button>
	<button className="button refresh" onClick={handleRefresh}>
	  <img src={RefreshIcon} alt="refresh-icon"/>
	</button>
	<div className="input-component">
	  <Input setSearch={setSearch}/>
	</div>
	<SortParams setSort={setType}/>
	<button className={`button open-btn btn-burger ${isOpen && 'is-open'}`} onClick={handleOpen}>
	  <span></span>
	  <span></span>
	  <span></span>
	</button>
  </div>
}

const mapStateToProps = ({application}) => {
  return {
	isOpen: application.isOpen
  }
}

const mapDispatchToProps = {
  setFiltersOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(NavParams);